import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userToken, setUsertoken] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewblog] = useState(null)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      const token = 'bearer ' + user.token
      console.log(token)
      setUsertoken(token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(user)
      if (!(user)) {
        setErrorMessage('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
    <h2>log in to application</h2>
    <ErrorNotification message={errorMessage} />
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const logoutForm = () => {
    return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification blog={newBlog} />
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <BlogForm
        blogs={blogs}
        userToken={userToken}
        setNewblog={setNewblog}
        setBlogs={setBlogs}
      />
      <br/>
      {sortedBlogs.map(blog =>
        <Blog
        key={blog.id}
        blog={blog}
        setBlogs={setBlogs}
        />
      )}
    </div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        logoutForm()
      }
    </div>
  )
}

export default App