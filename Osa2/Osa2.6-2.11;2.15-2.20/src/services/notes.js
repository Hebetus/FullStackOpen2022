import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
}

const newPerson = (newObject) => {
    return axios.post('http://localhost:3001/persons', newObject)
}

const NoteService = {
    getAll,
    newPerson
}

export default NoteService;