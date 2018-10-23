'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema ({
    content: {
        type: String,
        required: [true, 'answer can\'t be empty ']
    },
    topicid: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    answerusername: {
        type: String
    },
    answeruserid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotesanswer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotesanswer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer