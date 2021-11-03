import React from "react"

const Login = ({ username }) => {
    const handleLogin = () => {

    }
    if (username === "test") {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                            <input
                            type="text"
                            value={username}
                            />
                    </div>
                </form>
            </div>
        )
    }
    return null
}

export default Login