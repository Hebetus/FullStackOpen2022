import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (object) => {
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteOnAnecdote = async (id, object) => {
    const objectUrl = baseUrl + `/${id}`
    const response = await axios.put(objectUrl, object)
    return response.data
}

export default {
    getAll,
    createNew,
    voteOnAnecdote
}