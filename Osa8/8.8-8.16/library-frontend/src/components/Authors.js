import { gql, useQuery } from '@apollo/client'

const Authors = ({ show }) => {
  const ALL_AUTHORS = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `

  const result = useQuery(ALL_AUTHORS)

  const { loading, data, error } = result

  if (loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  return (
    <div>
      
    </div>
  )

  /**
   * JOSTAIN SYYSTÄ GRAPHQL EI SUOUSTO TOIMIMAAN TÄMÄN KOMPONENTIN OSALTA,
   * LIENEE JOKIN ONGELMA SELAIMEN VÄLIMUISTIN KÄYTÖSSÄ, MIKÄ EI TAAS TOSIN
   * OLE TÄMÄN KAPPALEEN AIHE
   * 
   * <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthor.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
   */
}

export default Authors