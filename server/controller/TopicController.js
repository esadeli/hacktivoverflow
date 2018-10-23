'use strict'

const Topic = require('../models/topic')

class TopicController {
    // create topic
    static createTopic(req,res){
        Topic.create({
            title: req.body.title,
            description: req.body.description,
            author: req.decoded.userid
        })
          .then(topic =>{
            res.status(201).json({
                msg: 'Topic has been created',
                data: topic
            })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create Topic',
                  err: error
              })
          })
    }

    // edit topic
    static editTopic(req,res){
        Topic.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        })
         .then(topic =>{
            res.status(201).json({
                msg: 'Topic updated',
                data: topic
            })
         })
         .catch(error => {
             res.status(500).json({
                msg: 'ERROR Get Data before edit',
                err: error
             })
         })
    }

    // delete topics
    static deleteTopic(req,res){
        Topic.findOneAndRemove({
            _id: req.params.id
        })
          .then(topic => {
            res.status(201).json({
                msg: 'Topic has been deleted',
                data: topic
            })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Delete topic',
                  err: error
              })
          })
    }

    // get list of topics
    static getListOfTopic(req,res){
        Topic.find({})
          .then(topics => {
              res.status(200).json({
                  msg: 'List of topics',
                  data: topics
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Get list of topics ',
                  err: error
              })
          })
    }

    // get detail topic
    static getDetail(req,res){
        Topic.findOne({ _id: req.params.id })
          .then(topic => {
            res.status(200).json({
                msg: `Detail of topic ${topic.title}`,
                data: topic
            })
          })
          .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Get detail topic ',
                err: error
            })
          })
    }
}

module.exports = TopicController