import axios from 'axios'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showBlog, setShowBlog] = useState(false)
  const [blogLikes, setBlogLikes] = useState(props.blog.likes)
  const username = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username
  let token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
  token = "bearer " + token
  const id = props.blog.id
  const showWhenVisible = { display: showBlog ? '' : 'none' }
  const hideWhenVisible = { display: showBlog ? 'none' : '' }

  const addLike = (id) => {
    axios.put(`/api/blogs/:${id}`, { likes: blogLikes + 1 })
    setBlogLikes(blogLikes + 1)
  }

  const removeBlog = () => {
    if (!(window.confirm("You sure you want to delete this blog?"))) {
      return
    }
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios.delete(`/api/blogs/:${id}`, config)
    setTimeout(() => {
      blogService.getAll().then(blogs =>
          props.setBlogs( blogs )
      )
  }, 1000)
  }

  if (props.blog.user.username === username) {
    return (
      <div style={blogStyle}>
        {props.blog.title} {props.blog.author}
        <div style={hideWhenVisible}>
          <button onClick={() => setShowBlog(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={() => setShowBlog(false)}>hide</button>
          url: {props.blog.url}
          <br/>
          likes: {blogLikes}
          <button onClick={() => addLike(props.blog.id, props.blog.likes)}>like</button>
          <br/>
          added by: {props.blog.user.username}
        </div>
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (
  <div style={blogStyle}>
    {props.blog.title} {props.blog.author}
    <div style={hideWhenVisible}>
      <button onClick={() => setShowBlog(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
      <button onClick={() => setShowBlog(false)}>hide</button>
      url: {props.blog.url}
      <br/>
      likes: {blogLikes}
      <button onClick={() => addLike(props.blog.id, props.blog.likes)}>like</button>
      <br/>
      added by: {props.blog.user.username}
    </div>
  </div>
  )}

export default Blog