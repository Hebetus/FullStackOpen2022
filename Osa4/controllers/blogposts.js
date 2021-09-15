const blogPostsRouter = require('express').Router()
const Blog = require('../models/blog')

blogPostsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogPostsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogPostsRouter