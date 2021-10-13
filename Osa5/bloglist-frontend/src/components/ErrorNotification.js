import React from "react"

const ErrorNotification = (message) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message.message === null) {
        return null
    }
    else {
        return (
            <div style={errorStyle}>
                wrong username or password
            </div>
        )
    }
}

export default ErrorNotification