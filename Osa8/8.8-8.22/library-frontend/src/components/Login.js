import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`

const Login = ({ show, setLoggedIn, setFavoriteGenre }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login ] = useMutation(LOGIN)

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } }).then(response => {
            setFavoriteGenre(response.data.value)
        })
        setUsername('')
        setPassword('')
        setLoggedIn(true)
    }

    /**
     * Mongoose tarjoaa vain yhden ilmaisen tietokannan per käyttäjä (joka allekirjoittaneen osalta on jo harjoitustyössä kiinni),
     * joten varsinaisten skeemojen määrittelyn lisäksi ei ole mahdollista tehdä varsinaista tietokantayhteyttä tämän osa tehtävien osalta
     * (ilmaiseksi siis)
     */

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username: 
                    <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password: 
                    <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login