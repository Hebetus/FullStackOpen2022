import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { handleNewAnecdote } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'
import { handleSubmitAction } from "../reducers/anecdoteReducer"

const AnecdoteForm = ({ setVisibility }) => {
    const [newAnecdote, setNewAnecdote] = useState('a new anecdote')
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        setNewAnecdote(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdote = await anecdoteService.createNew(newAnecdote)
        dispatch(
            handleSubmitAction(anecdote)
        )
        dispatch(
            handleNewAnecdote(newAnecdote)
        )
        setVisibility(true)
        setNewAnecdote('')
        setTimeout(() => setVisibility(false), 5000)
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