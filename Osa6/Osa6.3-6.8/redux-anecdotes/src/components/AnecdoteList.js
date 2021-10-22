import React from "react"
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { vote1 } from '../reducers/anecdoteReducer'
import { newVote } from "../reducers/notificationReducer"

const AnecdoteList = ({ setVisibility, setNotification }) => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterText))
    anecdotes = anecdotes.sort((a, b) => a.votes - b.votes)
    const dispatch = useDispatch()

    const vote = (event) => {
        dispatch(
            vote1(event.target.id)
        )
        dispatch(
            newVote()
        )
        setVisibility(true)
        setTimeout(() => setVisibility(false), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <Button handleClick={vote} text="vote" id={anecdote.id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList