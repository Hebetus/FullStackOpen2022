import React, {useState} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const [visibility, setVisibility] = useState(false)

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