import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from 'react-router-dom'
import { useField } from './hooks' 

const Notification = (props) => {
  return (
    <div>
      {props.notification}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><a href={`http://localhost:3000/anecdotes/${anecdote.id}`} >{anecdote.content}</a></li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdoteById = anecdotes.find(a => a.id === id)

  return (
    <div>
      <h2>Authored by {anecdoteById.author} </h2>
      <p>{anecdoteById.content}</p>
      <p>Votes: {anecdoteById.votes}</p>
      <p>Info: {anecdoteById.info} </p>
    </div>
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
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()
  const contentHook = useField('content')
  const authorHook = useField('author')
  const infoHook = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = contentHook.value
    const author = authorHook.value
    const info = infoHook.value
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification(`added new blog by ${author}`)
    history.push('/anecdotes')
    setTimeout(() => props.setNotification(''), 10000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentHook.reset()
    authorHook.reset()
    infoHook.reset()
  }
 
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset} >
        <div>
          content
          <input
            type={contentHook.type}
            value={contentHook.value}
            onChange={contentHook.onChange}
          />
        </div>
        <div>
          author
          <input
            type={authorHook.type}
            value={authorHook.value}
            onChange={authorHook.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            type={infoHook.type}
            value={infoHook.value}
            onChange={infoHook.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const padding = {
    paddingRight: 5
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  /**
   * Possibly used later on
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  */

  return (
    <Router>
      <div>
        <Link style={padding} to="/">about</Link>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create-new">create new</Link>
      </div>

      <Notification notification={notification} />

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create-new">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path="/">
          <About />
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}

export default App;