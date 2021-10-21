import React, { useState } from "react"
import { handleSubmit1 } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"


const AnecdoteForm = () => {
    const [newAnecdote, setNewAnecdote] = useState('a new anecdote')
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        setNewAnecdote(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target)
        dispatch(
          handleSubmit1(newAnecdote)
        )
        setNewAnecdote('')
    }

    return (
        <div>
            <h2>create new</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        value={newAnecdote}
                        onChange={handleChange}
                    />
                    <button type="submit">create</button>
                </form>
        </div>
    )
}

export default AnecdoteForm