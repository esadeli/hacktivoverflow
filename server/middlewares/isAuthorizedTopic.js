'use strict'

const Topic = require('../models/topic')

function isAuthorizedTopic(req,res,next){
    Topic.findOne({ _id: req.params.id})
     .then(topic =>{
        if(topic.author == req.decoded.userid){
            next()
        } else {
            res.status(403).json({
                msg: 'ERROR User is not authorized - Topic'
            })
        }
     })
     .catch(error => {
         res.status(500).json({
             msg: 'ERROR Find Topic for authorization',
             err: error
         })
     })
}

module.exports = isAuthorizedTopic