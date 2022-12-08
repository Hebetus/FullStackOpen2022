import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Login from './components/Login'
import Logout from './components/Logout'

const App = () => {
  const [page, setPage] = useState('authors')
  const [isLoggedIn, setLoggedin] = useState(false)
  const [favoriteGenre, setFavoriteGenre] = useState('')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => setPage('login')}>login</button>
        {
          isLoggedIn
          ?
          <button onClick={() => setPage('logout')}>logout</button>
          :
          null
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommend'} favoriteGenre={favoriteGenre} />

      <Login show={page === 'login'} setLoggedin={setLoggedin} setFavoriteGenre={setFavoriteGenre} />

      <Logout show={page === 'logout'} isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
