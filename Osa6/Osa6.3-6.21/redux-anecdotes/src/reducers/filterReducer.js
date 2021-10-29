const initialState = ''

export const filter = (filterText) => {
    return {
        type: 'FILTER',
        data: filterText
    }
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) { 
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export default filterReducer