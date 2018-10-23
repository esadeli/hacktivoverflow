'use strict'

const Topic = require('../models/topic')
const User = require('../models/user')
const Answer = require('../models/answer')

class TopicController {
    // create topic
    static createTopic(req,res){
        Topic.create({
            title: req.body.title,
            description: req.body.description,
            author: req.decoded.userid
        })
          .then(topic =>{
            
            let newTopic = topic
            // update user
            User.findOneAndUpdate({ _id: req.decoded.userid},
                {
                    $push: {
                        topics: newTopic._id
                    }
                })
                .then(user => {
                    // update user data success
                    res.status(201).json({
                        msg: 'Topic has been created',
                        data: newTopic
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        msg: 'ERROR Update User after create',
                        err: error
                    })
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
            let deletedTopic = topic

            // delete all the comments related to this topic
            Answer.deleteMany({
                topicid: deletedTopic._id
            })
              .then(answer => {
                    // update user
                    User.findOneAndUpdate({ _id: req.decoded.userid},
                        {
                            $pull: {
                                topics: deletedTopic._id
                            }
                        })
                        .then(user => {
                            // update user data success
                            res.status(201).json({
                                msg: 'Topic has been deleted',
                                data: deletedTopic
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                msg: 'ERROR Update User after delete',
                                err: error
                            })
                        })
              })
              .catch(error =>{
                  res.status(500).json({
                      msg: 'ERROR Delete Answer related to article',
                      err: error
                  })
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
        Topic.findOne({ _id: req.params.id }).populate('author')
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

    // get list of topics
    static searchTopicByTitle(req,res){
        Topic.find({})
          .then(topics => {
              let sortedArr = []
              let regex = new RegExp(`${req.body.keyword}`,'i')
              
              topics.forEach(topic => {
                  if(regex.test(topic.title)){
                      sortedArr.push(topic)
                  }
              });  

              res.status(200).json({
                  msg: 'List of topics by keyword',
                  data: sortedArr
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Get list of topics ',
                  err: error
              })
          })
    }

    // upvotes topic
    static upVotes(req,res){
        Topic.findOne({
            _id: req.params.id
        })
         .then(topic => {
            let upvotedtopic = topic
            // check if it's her/his own article
            if(topic.author != req.decoded.userid) {
                // check if the user has already upvote this
                if(topic.upvotes.indexOf(`${req.decoded.userid}`)=== -1){
                    Topic.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $push: {
                          upvotes: req.decoded.userid  
                        }
                    })
                      .then(topic =>{
                          res.status(201).json({
                              msg: 'Topic has been upvoted',
                              data: topic
                          })
                      })
                      .catch(error => {
                          res.status(201).json({
                              msg: 'ERROR Upvotes topic',
                              err: error
                          })
                      })
                } else if (topic.upvotes.indexOf(`${req.decoded.userid}`) !== -1) {
                    Topic.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $pull: {
                          upvotes: req.decoded.userid  
                        }
                    })
                      .then(topic =>{
                          res.status(201).json({
                              msg: 'Upvotes has been cancelled',
                              data: topic
                          })
                      })
                      .catch(error => {
                          res.status(201).json({
                              msg: 'ERROR Cancel Upvotes topic',
                              err: error
                          })
                      })
                }
            } else if(topic.author == req.decoded.userid) {
                res.status(400).json({
                    msg: 'User can\'t upvote her/his own topic '
                })
            }   
         })
         .catch(error =>{
             res.status(500).json({
                msg: 'ERROR Getting Data before Upvotes',
                err: error 
             })
         })
    }

    // downvotes topic
    static downVotes(req,res){
        Topic.findOne({
            _id: req.params.id
        })
         .then(topic => {
            let downvotedtopic = topic
            // check if it's her/his own article
            if(topic.author != req.decoded.userid) {
                // check if the user has already upvote this
                if(topic.downvotes.indexOf(`${req.decoded.userid}`)=== -1){
                    Topic.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $push: {
                          downvotes: req.decoded.userid  
                        }
                    })
                      .then(topic =>{
                          res.status(201).json({
                              msg: 'Topic has been downvoted',
                              data: topic
                          })
                      })
                      .catch(error => {
                          res.status(201).json({
                              msg: 'ERROR Downvotes topic',
                              err: error
                          })
                      })
                } else if (topic.downvotes.indexOf(`${req.decoded.userid}`) !== -1) {
                    Topic.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $pull: {
                          downvotes: req.decoded.userid  
                        }
                    })
                      .then(topic =>{
                          res.status(201).json({
                              msg: 'Downvotes has been cancelled',
                              data: topic
                          })
                      })
                      .catch(error => {
                          res.status(201).json({
                              msg: 'ERROR Cancel Downvotes topic',
                              err: error
                          })
                      })
                }
            } else if(topic.author == req.decoded.userid) {
                res.status(400).json({
                    msg: 'User can\'t downvote her/his own topic '
                })
            }   
         })
         .catch(error =>{
             res.status(500).json({
                msg: 'ERROR Getting Data before Downvotes',
                err: error 
             })
         })
    }

    // share topic
    static share(req,res){
        Topic.findOneAndUpdate({
            _id: req.params.id
        },{
            $push: {
                shares: req.decoded.userid
            }
        })
          .then(topic =>{
              res.status(201).json({
                  msg: 'Topic has been shared',
                  data: topic
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Sharing topic',
                  err: error
              })
          })
    }
}

module.exports = TopicController