'use strict'

const Answer = require('../models/answer')

function isAuthorizedAnswer(req,res,next){
    Answer.findOne({ _id: req.params.id})
     .then(answer =>{
        if(answer.answeruserid == req.decoded.userid){
            next()
        } else {
            res.status(403).json({
                msg: 'ERROR User is not authorized - Answer'
            })
        }
     })
     .catch(error => {
         res.status(500).json({
             msg: 'ERROR Find Answer for authorization',
             err: error
         })
     })
}

module.exports = isAuthorizedAnswer