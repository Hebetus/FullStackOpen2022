import axios from 'axios'
const baseUrl = '/api/blogs'
let token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
token = "bearer " + token

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { getAll, newBlog }