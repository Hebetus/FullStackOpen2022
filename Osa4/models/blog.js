const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

const blogSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Blog', blogSchema)