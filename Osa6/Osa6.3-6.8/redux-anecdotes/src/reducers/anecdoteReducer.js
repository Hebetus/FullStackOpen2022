import anecdoteService from '../services/anecdotes'

export const handleVoteAction = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const handleSubmitAction = (newAnecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: newAnecdote
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
      const id = action.data
      const anecdoteToChange = state.find(n => n.id === id)
      const newAnecdote = {
        content: anecdoteToChange.content, 
        id: anecdoteToChange.id,
        votes: anecdoteToChange.votes + 1
      }
      anecdoteService.voteOnAnecdote(id, newAnecdote)
      const newState = state.filter(n => n.id !== id)
      newState.push(newAnecdote)
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