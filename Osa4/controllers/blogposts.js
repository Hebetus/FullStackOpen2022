const blogPostsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogPostsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogPostsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'missing token or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!(request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url'))) {
      return response.status(400).end()
    }
    if (!(request.body.hasOwnProperty('likes'))) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogPostsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const id = decodedToken.id
    const deletableBlog = await Blog.find({ id: request.params.id[1] })
    const deletableBlogUserId = deletableBlog[0].user.toString()
    console.log(id, deletableBlog, deletableBlogUserId)

    if (id !== deletableBlogUserId) {
      return response.status(400).json('invalid token').end()
    }
    
    await Blog.deleteOne({ id:  request.params.id[1] })
          response.sendStatus(200)

})

blogPostsRouter.put('/:id', async (request, response) => {
    await Blog.findOneAndUpdate({ id: request.params.id[1] }, request.body)
          response.sendStatus(201)
})

module.exports = blogPostsRouter