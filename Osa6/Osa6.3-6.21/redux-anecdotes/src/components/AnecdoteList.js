import React from "react"
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { handleVoteAction } from '../reducers/anecdoteReducer'
import { newVote, changeVisibilityToFalse } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterText))
    anecdotes = anecdotes.sort((a, b) => a.votes - b.votes)
    const dispatch = useDispatch()
    let timeOutId

    const vote = (event) => {
        dispatch(
            handleVoteAction(event.target.id, anecdotes)
        )
        dispatch(
            newVote(event.target.id + 1)
        )
        window.clearInterval(timeOutId)
        timeOutId =
        setTimeout(() => 
            dispatch(changeVisibilityToFalse())
            , 5000
        )
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div id={anecdote.id + 1} >
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