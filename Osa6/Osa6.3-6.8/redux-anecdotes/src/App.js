import React, { useEffect, useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { intitializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const [visibility, setVisibility] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(intitializeAnecdotes(anecdotes)))
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification visibility={visibility} />
      <Filter />
      <AnecdoteList setVisibility={setVisibility} />
      <AnecdoteForm setVisibility={setVisibility} />
    </div>
  )
}

export default App