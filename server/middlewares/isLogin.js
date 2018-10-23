'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    jwt.verify(req.headers.token, process.env.SECRETTOKEN, (err,decoded)=>{
        if(!err){
            let decodedobj = decoded

            User.findOne({
                _id: decoded.userid
            })
             .then(user => { 
                req.decoded = decodedobj
                next()
             })
             .catch(error => {
                res.status(500).json({
                   msg: 'ERROR Get user data after verify',
                   err: error  
                })
             })
        } else {
            res.status(403).json({
                msg: 'ERROR Verify TOKEN User is not authorized'
            })
        }
    })
}

module.exports = isLogin