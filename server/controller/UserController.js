'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const emailValidator = require('../helpers/emailValidator')
const hashPassword = require('../helpers/hashPassword')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController{
    // register user
    static registerUser(req,res){
        if(emailValidator(req.body.email)){
            User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                thirdpartylogin: 'NO'
            })
             .then(user => {
                 // get the token
                 jwt.sign({
                     userid: user._id,
                     name: user.name,
                     username: user.username,
                     email: user.email
                 },process.env.SECRETTOKEN, (err, token) => {
                     if(!err){
                         res.status(201).json({
                            msg: 'Register successful',
                            token: token
                         })
                     } else {
                        res.status(500).json({
                            msg: 'ERROR Token when register user ',
                            err: err
                        })
                     }
                 })
             })
             .catch(error => {
                 res.status(500).json({
                     msg: 'ERROR Register user ',
                     err: error
                 })
             })
        }else {
            res.status(400).json({
                msg: 'Please Check your email'
            })
        }
    }

    // login user
    static loginUser(req,res) {
        let hash = hashPassword(req.body.password)
        if(emailValidator(req.body.logininput)){
            User.findOne({
                email: req.body.logininput,
                password: hash
            })
              .then(user => {
                  // get the token
                  jwt.sign({
                     userid: user._id,
                     name: user.name,
                     username: user.username,
                     email: user.email
                  },process.env.SECRETTOKEN, (err, token) => {
                    if(!err) {
                        res.status(201).json({
                            msg: 'Login successful',
                            token: token
                         })
                    } else {
                        res.status(500).json({
                            msg: 'ERROR Token when login user ',
                            err: err
                        })
                    }
                  })
              })
              .catch(error => {
                  res.status(500).json({
                      msg: 'ERROR Login User Email',
                      err: error
                  })
              })
        } else if(!emailValidator(req.body.logininput)){
            User.findOne({
                username: req.body.logininput,
                password: hash
            })
              .then(user => {
                  if(user){
                      // get the token
                    jwt.sign({
                        userid: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },process.env.SECRETTOKEN, (err, token) => {
                        if(!err) {
                            res.status(201).json({
                                msg: 'Login successful',
                                token: token
                                })
                        } else {
                            res.status(500).json({
                                msg: 'ERROR Token when login user ',
                                err: err
                            })
                        }
                    })
                  } else {
                    res.status(400).json({
                        msg: 'Please Check your email, username, or password'
                    })
                  }
              })
              .catch(error => {
                  res.status(500).json({
                      msg: 'ERROR Login User Username',
                      err: error
                  })
              })
        }
    }

    // login google
    static loginGoogle(req,res){
        return new Promise((resolve,reject)=>{
            client.verifyIdToken({
              idToken: req.body.googletoken,
              audience: process.env.GOOGLE_CLIENT_ID
            },(err,result)=>{
                if(!err){
                    // console.log('RESULT--->', result)
                    // const payload = result.getPayload()
                    // const userid = payload['sub']
                    resolve('anything') // replace with anything instead of userid
                }else{
                    reject(err)
                }
            })
        })
         .then(accessok =>{
            // gain the data from Google
            axios({
               method: 'GET',
               url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.googletoken}` 
            })
              .then(result=>{
                // console.log('HASIL DATA--->', result.data)
                // check the user first
                User.findOne({
                   email: result.data.email  
                })
                 .then(user=>{
                    if(user){
                        // get the jwt token
                        jwt.sign({
                            userid: user._id,
                            name: user.name,
                            email: user.email,
                            username: user.name
                        },process.env.SECRETTOKEN, (err,token)=>{
                            if(!err){
                              res.status(200).json({
                                 msg: 'User Login via Google Success',
                                 token: token
                              })
                            }else{
                              res.status(500).json({
                                  msg: 'ERROR TOKEN: ',err
                              })
                            }
                        })
                    }else if(user===null){
                        //create new user
                        let hash = hashPassword(process.env.DEFAULT_PASSWORD)
                        User.create({
                          name: result.data.name,
                          email: result.data.email,
                          username: result.data.email,
                          password: hash,
                          thirdpartylogin: 'YES'
                        })
                         .then(user=>{
                            jwt.sign({
                                userid: user._id,
                                name: user.name,
                                email: user.email,
                                username: user.name
                            },process.env.SECRETTOKEN, (err,token)=>{
                               if(!err){
                                  res.status(200).json({
                                     msg: 'User Registration via Google Success',
                                     token: token
                                  })
                                }else{
                                    res.status(500).json({
                                        msg: 'ERROR TOKEN: ',err
                                    })
                                }
                           })
                         })
                         .catch(error =>{
                            res.status(500).json({
                                msg: 'ERROR: ',error
                            })         
                         })
                    }
                 })
                 .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR: ',error
                    })     
                 })
              })
              .catch(error=>{
                res.status(500).json({
                    msg: 'ERROR Get Data Google Login: ',error
                })      
              })
         })
         .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Verify Google TOKEN Google Login: ',error
            })
         })
    }

    // get credentials
    static getBasicinfo(req,res){
        let data = req.decoded
        res.status(200).json({
            msg: 'User basic info',
            data: data
        })
    }
}

module.exports = UserController