const initialState = [false, 'test']

export const newVote = (id) => {
    const message = document.getElementById(id).textContent
    return {
        type: 'VOTE_MESSAGE',
        data: `voted on ${message}`
    }
}

export const handleNewAnecdote = (message) => {
    return {
        type: 'ANECDOTE_MESSAGE',
        data: `Created a new anecdote: ${message}`
    }
}

export const changeVisibilityToTrue = () => {
    console.log('visibility changed to true')
    return {
        type: 'CHANGE_VISIBILITY_TRUE'
    }
}

export const changeVisibilityToFalse = () => {
    console.log('visibility changed to false')
    return {
        type: 'CHANGE_VISIBILITY_FALSE'
    }
}

const notificationReducer = (state = initialState, action) => {
    const newState = state
    switch(action.type) {
        case 'VOTE_MESSAGE':
            return [true, action.data]
        case 'ANECDOTE_MESSAGE':
            return [true, action.data]
        case 'CHANGE_VISIBILITY_TRUE':
            return [true, newState[1]]
        case 'CHANGE_VISIBILITY_FALSE':
            return [false, newState[1]]
        default:
            return state
    }
}

export default notificationReducer