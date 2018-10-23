'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const emailValidator = require('../helpers/emailValidator')

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
        if(emailValidator(req.body.logininput)){
            User.findOne({
                email: req.body.logininput 
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
                username: req.body.logininput
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