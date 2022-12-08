import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
  }
}
`

const Books = ({ show }) => {
  const [showGenre, setShowGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  const { loading, data, error } = result

  if (!show) {
    return null
  }

  switch (showGenre) {
    /**
     * case 'refactoring':
      return null
    case 'agile':
      return null
    case 'patterns':
      return null
    case 'design': 
      return null
    case 'crime':
      return null
    case 'classic':
      return null
     */
    default:
      return (
        <div>
          <h2>books</h2>

          <p>in genre {showGenre}</p>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={() => setShowGenre('refactoring')}>refactoring</button>
            <button onClick={() => setShowGenre('agile')}>agile</button>
            <button onClick={() => setShowGenre('patterns')}>patterns</button>
            <button onClick={() => setShowGenre('design')}>design</button>
            <button onClick={() => setShowGenre('crime')}>crime</button>
            <button onClick={() => setShowGenre('classic')}>classic</button>
            <button onClick={() => setShowGenre('all genres')}>all genres</button>
          </div>
        </div>
      )
}
}

export default Books