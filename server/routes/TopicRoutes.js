'use strict'

const express = require('express')
const router = express.Router()
const TopicController = require('../controller/TopicController')
const isAuthorizedTopic = require('../middlewares/isAuthorizedTopic')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin,TopicController.createTopic)
router.get('/lists', TopicController.getListOfTopic)
router.post('/search', TopicController.searchTopicByTitle)
router.post('/upvotes/:id', isLogin, TopicController.upVotes )
router.post('/downvotes/:id', isLogin, TopicController.downVotes )
router.post('/shares/:id', isLogin, TopicController.share)
router.get('/:id', TopicController.getDetail)
router.put('/:id', isLogin, isAuthorizedTopic, TopicController.editTopic)
router.delete('/:id', isLogin, isAuthorizedTopic, TopicController.deleteTopic)

module.exports = router