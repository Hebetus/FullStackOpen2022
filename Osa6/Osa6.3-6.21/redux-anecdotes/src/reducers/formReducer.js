const intitialState = 'a new anecdote'

export const form = (formText) => {
    return {
        type: 'FORM_TEXT',
        data: formText
    }
}

const formReducer = (state = intitialState, action) => {
    switch(action.type) {
        case 'FORM_TEXT':
            return action.data
        default:
            return state
    }
}

export default formReducer