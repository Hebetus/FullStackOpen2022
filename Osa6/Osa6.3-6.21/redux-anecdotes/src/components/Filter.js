import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filter }) => {
    const handleChange = (event) => {
        filter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispathcToProps = {
    filter
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispathcToProps
)(Filter)

export default ConnectedFilter