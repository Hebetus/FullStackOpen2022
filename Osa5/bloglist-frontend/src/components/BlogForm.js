import React, { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from 'prop-types'

const BlogForm = (
    props
) => {
    const [newTitle, setNewtitle] = useState('')
    const [newAuthor, setNewauthor] = useState('')
    const [newUrl, setNewurl] = useState('')
    const [createBlogvisible, setCreateblogvisible] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blog = {
          id: props.blogs.length + 1,
          title: newTitle,
          author: newAuthor,
          url: newUrl
        }
        props.setNewblog(blog)
        blogService.newBlog(blog, props.userToken)
        setTimeout(() => {
          props.setNewblog(null)
        }, 4000)
        setTimeout(() => {
            blogService.getAll().then(blogs =>
                props.setBlogs( blogs )
            )
        }, 1000)
        setNewtitle('')
        setNewauthor('')
        setNewurl('')
        setCreateblogvisible(false)
    }

    const hideWhenVisible = { display: createBlogvisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogvisible ? '' : 'none' }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setCreateblogvisible(true)}>create blog</button>
            </div>

            <div style={showWhenVisible}>
                <form onSubmit={handleSubmit}>
                    <div>
                        title:
                            <input
                            type="text"
                            value={newTitle}
                            name="Title"
                            onChange={({ target }) => setNewtitle(target.value)}
                            />
                        </div>
                    <div>
                        author:
                            <input
                            ype="text"
                            value={newAuthor}
                            name="Author"
                            onChange={({ target }) => setNewauthor(target.value)}
                            />
                    </div>
                    <div>
                        url:
                            <input
                            type="text"
                            value={newUrl}
                            name="Url"
                            onChange={({ target }) => setNewurl(target.value)}
                            />
                    </div>
                    <button type="submit">create</button>
                </form>
                <button onClick={() => setCreateblogvisible(false)}>cancel</button>
            </div>
        </div>
    )
}

BlogForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    userToken: PropTypes.string.isRequired,
    setNewblog: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired
}

export default BlogForm