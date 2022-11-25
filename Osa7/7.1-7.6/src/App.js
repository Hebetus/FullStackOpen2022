import { useState } from 'react'
import { Routes, Route, Link, Navigate, useMatch, useNavigate } from 'react-router-dom'
import { useSelecor, useDispatch } from 'react-redux'

import { useField } from './hooks'

const AnecdoteList = ({ anecdotes }) => (
  <>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
        )
      }
    </ul>
  </>
)

const Anecdote = ({ anecdote }) => {
  const padding = {
    padding: 5
  }

  return (
    <>
      <li style={padding}>
        {anecdote.content}
      </li>
    </>
  )
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const resetAll = (e) => {
    e.preventDefault()
    content.setValue('')
    author.setValue('')
    info.setValue('')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <div>
          <button type='submit'>create</button>
          <button type='reset' value='Reset' onClick={resetAll} >reset</button>
        </div>
      </form>
    </div>
  )

}

const Notification = ({ notification, setNotification }) => {
  const padding = {
    padding: 5
  }

  return (
    notification ?
    <>
      <p style={padding}>{notification}</p>
    </>
    :
    null
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState(null)
  const [added, add] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification('TEST')
    add(true)
    navigate('/')
    add(false)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null
  
  const navigate = useNavigate()

  return (
    <>
      <Notification notification={notification} setNotification={setNotification} />
        <div>
          <Link style={padding} to="/">about</Link>
          <Link style={padding} to="/anecdotes/:id"></Link>
          <Link style={padding} to="/anecdotes">anecdotes</Link>
          <Link style={padding} to="/new">new anecdote</Link>
        </div>

        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/new" element={added ? <Navigate replace to="/" /> : <CreateNew addNew={addNew} />} />
          <Route path="/" element={<About />} />
        </Routes>
      <Footer />
    </>
    )
}

export default App
