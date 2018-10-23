'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title must not be empty']
    },
    description: {
        type: String,
        required: [true, 'Description must not be empty']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Topic = mongoose.model('Topic', TopicSchema)
module.exports = Topic