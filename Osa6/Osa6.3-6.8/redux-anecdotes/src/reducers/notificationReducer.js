const initialState = ''

export const handleNotification = (message) => {
    return {
        type: 'NEW_MESSAGE',
        data: message
    }
}

export const newVote = () => {
    return {
        type: 'VOTE_MESSAGE',
        data: 'voted'
    }
}

export const handleNewAnecdote = (message) => {
    return {
        type: 'ANECDOTE_MESSAGE',
        data: `Created a new anecdote: ${message}`
    }
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_MESSAGE':
            return action.data
        case 'VOTE_MESSAGE':
            return action.data
        case 'ANECDOTE_MESSAGE':
            return action.data
        case 'PREVIOUS_MESSAGE':
            return state
        default:
            return state
    }
}

export default notificationReducer