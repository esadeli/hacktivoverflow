'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/logingoogle', UserController.loginGoogle)


module.exports = router