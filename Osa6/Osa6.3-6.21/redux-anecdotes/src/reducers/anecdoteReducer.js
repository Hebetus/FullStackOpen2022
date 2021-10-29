import anecdoteService from '../services/anecdotes'

export const handleVoteAction = (id, anecdotes) => {
  return async dispatch => {
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    anecdoteToChange.votes++
    const vote = await anecdoteService.voteOnAnecdote(id, anecdoteToChange)
    dispatch({
      type: 'VOTE',
      data: vote
    })
  }
}

export const handleSubmitAction = (newAnecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  return async dispatch => {
    const object = {
      content: newAnecdote,
      id: getId(),
      votes: 0
    }
    const anecdote = await anecdoteService.createNew(object)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const intitializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const newState = [...state.filter(n => n.id !== action.data.id), action.data]
      return newState
    case 'NEW_ANECDOTE':
      const newAnecdoteState = [...state, action.data]
      return newAnecdoteState
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer