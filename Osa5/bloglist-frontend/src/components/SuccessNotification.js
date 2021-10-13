import React from "react"

const SuccessNotification = ({ blog }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (blog === null) {
        return null
    }
    else {
        return (
            <div style={successStyle}>
                a new blog {blog.title} by {blog.author} added
            </div>
        )
    }
}

export default SuccessNotification