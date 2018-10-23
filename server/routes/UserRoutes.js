'use strict'

const express = require('express')
const router = express.Router()
const Usercontroller = require('../controller/UserController')
const isLogin = require('../middlewares/isLogin')

router.get('/getbasicinfo', isLogin, Usercontroller.getBasicinfo)

module.exports = router
