import React from "react"
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { vote1 } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state)
    anecdotes = anecdotes.sort((a, b) => a.votes - b.votes)
    const dispatch = useDispatch()

    const vote = (event) => {
        console.log('vote', event.target.id)
        dispatch(
          vote1(event.target.id)
        )
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