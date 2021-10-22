const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote1 = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const handleSubmit1 = (newAnecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: newAnecdote,
      id: getId(),
      votes: 0
    }
  }
}

const initialState = anecdotesAtStart.map(asObject)
console.log(initialState)

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data
      const anecdoteToChange = state.find(n => n.id === id)
      const newAnecdote = {
        content: anecdoteToChange.content, 
        id: anecdoteToChange.id,
        votes: anecdoteToChange.votes + 1}
      const newState = state.filter(n => n.id !== id)
      newState.push(newAnecdote)
      console.log(anecdoteToChange, newAnecdote, state, newState, id)
      return newState
    case 'NEW_ANECDOTE':
      const newAnecdoteState = [...state, action.data]
      return newAnecdoteState
    default:
      return state
  }
}

export default anecdoteReducer