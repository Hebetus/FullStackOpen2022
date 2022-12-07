const mongoose = require('mongoose')

const bookschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

const authorschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})

module.exports = {
  Book: mongoose.model('Book', bookschema),
  Author: mongoose.model('Author', authorschema),
  User: mongoose.model('User', userschema)
}