'use strict'
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const IndexRoutes = require('./routes/IndexRoutes')
const UserRoutes = require('./routes/UserRoutes')
const TopicRoutes = require('./routes/TopicRoutes')
const AnswerRoutes = require('./routes/AnswerRoutes')
mongoose.connect('mongodb://localhost:27017/hacktivoverflowdb', {useNewUrlParser: true})

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/user', IndexRoutes)
app.use('/users', UserRoutes)
app.use('/topics', TopicRoutes)
app.use('/answers', AnswerRoutes)

app.get('/', (req,res)=>{ res.send('OK')})
app.listen(process.env.PORT || 3000, () =>{
    console.log('Listening to port ',process.env.PORT)
})