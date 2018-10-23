'use strict'

const Answer = require('../models/answer')
const Topic = require('../models/topic')

class AnswerController {
    // create answer
    static createAnswer(req,res){
        let answeredtopicid = req.body.topicid
        Answer.create({
            content: req.body.content,
            topicid: req.body.topicid,
            answerusername: req.decoded.name,
            answeruserid: req.decoded.userid
        })
          .then(answer =>{
              let newAnswer = answer
              // update topic
              Topic.findOneAndUpdate({
                  _id: answeredtopicid
              },{
                  $push: {
                      listanswers: newAnswer._id
                  }
              })
                .then(topic=>{
                    res.status(201).json({
                        msg: 'Answer created',
                        data: newAnswer
                    })
                })
                .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR Update Topic after create answer',
                        err: error
                    })
                })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create Answer',
                  err: error
              })
          })
    }

    // get list of answers
    static getListOfAnswers(req,res){
        Answer.find({})
          .then(answers=>{
              res.status(200).json({
                  msg: 'List of answers',
                  data: answers
              })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Getting list of answers',
                  err: error
              })
          })
    }

    // update answer
    static updateAnswer(req,res){
        Answer.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: {
                content: req.body.content
            }
        })
          .then(answer => {
            res.status(201).json({
                msg: 'Answer Updated',
                data: answer
            })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR update answer',
                  err: error
              })
          })
    }

    // delete answer
    static deleteAnswer(req,res) {
        Answer.findOneAndRemove({
            _id: req.params.id
        })
          .then(answer =>{
              res.status(201).json({
                  msg: 'Answer Deleted',
                  data: answer
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Delete answer',
                  err: error
              })
          })
    }

    // upvotes answer
    static upvoteAnswer(req,res){
        Answer.findOne({
            _id: req.params.id
        })
          .then(answer =>{
             let foundanswer = answer
             // check if it's own user
             if(foundanswer.answeruserid != req.decoded.userid){
                //check if the user has already upvoted the answer
                if(foundanswer.upvotesanswer.indexOf(req.decoded.userid) === -1){
                   Answer.findOneAndUpdate({
                       _id: req.params.id
                   },{
                       $push: {
                        upvotesanswer: req.decoded.userid
                       }
                   })
                     .then(answer => {
                        res.status(201).json({
                            msg: 'Answer Upvoted',
                            data: answer
                        })
                     })
                     .catch(error => {
                        res.status(500).json({
                            msg: 'ERROR Upvote answer',
                            err: error
                        })
                     })
                }else if(foundanswer.upvotesanswer.indexOf(req.decoded.userid) !== -1){
                    Answer.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $pull: {
                         upvotesanswer: req.decoded.userid
                        }
                    })
                      .then(answer => {
                         res.status(201).json({
                             msg: 'Cancel upvote answer',
                             data: answer
                         })
                      })
                      .catch(error => {
                         res.status(500).json({
                             msg: 'ERROR Cancel upvote answer',
                             err: error
                         })
                      })
                }
             }else if(foundanswer.answeruserid == req.decoded.userid){
                res.status(500).json({
                    msg: 'User can\'t upvote her/his own answer'
                })
             }
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Upvotes answer',
                  err: error
              })
          })
    }

    // down votes answer
    static downvoteAnswer(req,res){
        Answer.findOne({
            _id: req.params.id
        })
          .then(answer =>{
             let foundanswer = answer
             // check if it's own user
             if(foundanswer.answeruserid != req.decoded.userid){
                //check if the user has already upvoted the answer
                if(foundanswer.downvotesanswer.indexOf(req.decoded.userid) === -1){
                   Answer.findOneAndUpdate({
                       _id: req.params.id
                   },{
                       $push: {
                        downvotesanswer: req.decoded.userid
                       }
                   })
                     .then(answer => {
                        res.status(201).json({
                            msg: 'Answer Downvoted',
                            data: answer
                        })
                     })
                     .catch(error => {
                        res.status(500).json({
                            msg: 'ERROR Downvote answer',
                            err: error
                        })
                     })
                }else if(foundanswer.downvotesanswer.indexOf(req.decoded.userid) !== -1){
                    Answer.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        $pull: {
                         downvotesanswer: req.decoded.userid
                        }
                    })
                      .then(answer => {
                         res.status(201).json({
                             msg: 'Cancel downvote answer',
                             data: answer
                         })
                      })
                      .catch(error => {
                         res.status(500).json({
                             msg: 'ERROR Cancel downvote answer',
                             err: error
                         })
                      })
                }
             }else if(foundanswer.answeruserid == req.decoded.userid){
                res.status(500).json({
                    msg: 'User can\'t downvote her/his own answer'
                })
             }
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Downvotes answer',
                  err: error
              })
          })
    }
}

module.exports = AnswerController