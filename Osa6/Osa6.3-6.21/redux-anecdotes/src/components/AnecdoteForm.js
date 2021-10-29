import React from "react"
import { connect } from "react-redux"
import { handleNewAnecdote, changeVisibilityToFalse } from "../reducers/notificationReducer"
import { handleSubmitAction } from "../reducers/anecdoteReducer"
import { form } from "../reducers/formReducer"

const AnecdoteForm = ({ formText, form, handleSubmitAction, handleNewAnecdote, changeVisibilityToFalse }) => {
    const newAnecdote = formText

    const handleChange = (event) => {
        event.preventDefault()
        form(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        handleSubmitAction(newAnecdote)
        handleNewAnecdote(newAnecdote)
        setTimeout(() => 
            changeVisibilityToFalse
            , 5000)
        form('')
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

const mapStateToProps = (state) => {
    return {
        formText: state.form
    }
}

const mapDispathcToProps = {
    form,
    handleSubmitAction,
    handleNewAnecdote,
    changeVisibilityToFalse
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispathcToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm