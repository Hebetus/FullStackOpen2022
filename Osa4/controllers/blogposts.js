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
    if (!(request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url'))) {
      response.status(400).end()
    }
    if (!(request.body.hasOwnProperty('likes'))) {
      blog.likes = 0
    }
    blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogPostsRouter.delete('/:id', async (request, response) => {
    await Blog.deleteOne({ id:  request.params.id[1] })
          response.sendStatus(200)
})

blogPostsRouter.put('/:id', async (request, response) => {
    await Blog.findOneAndUpdate({ id: request.params.id[1] }, request.body)
          response.sendStatus(201)
})

module.exports = blogPostsRouter