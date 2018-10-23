'use strict'

const express = require('express')
const router = express.Router()
const AnswerController = require('../controller/AnswerController')
const isLogin = require('../middlewares/isLogin')
const isAuthorizedAnswer = require('../middlewares/isAuthorizedAnswer')

router.post('/', isLogin, AnswerController.createAnswer )
router.get('/lists', AnswerController.getListOfAnswers )
router.post('/upvotes/:id', isLogin, AnswerController.upvoteAnswer)
router.post('/downvotes/:id', isLogin, AnswerController.downvoteAnswer )
router.put('/:id', isLogin, isAuthorizedAnswer, AnswerController.updateAnswer )
router.delete('/:id', isLogin, isAuthorizedAnswer, AnswerController.deleteAnswer)

module.exports = router