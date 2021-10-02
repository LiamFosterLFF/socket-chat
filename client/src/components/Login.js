import React, { useState } from 'react'

const Login = () => {

    const options = [
        {id: "javascript", value: "javascript", text: "Javascript"},
        {id: "python", value: "python", text: "Python"},
    ]

    const [ username, setUsername ] = useState("")
    const [ group, setGroup ] = useState(options[0])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div id='login-outer-wrapper'>
            <div id='login-upper-bar'>
                <div>Socket Chat</div>
            </div>
            <div id='login-lower-bar'>
                <form>
                    <label for="username">Username:</label><br/>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                    <label for="group">Group:</label><br/>
                    <select list="groups" name="group" value={group} onChange={e => setGroup(e.target.value)}>
                        {options.map((option, ind) => {
                            return <option key={ind} value={option.value} id={`login-group-option-${option.id}`} >{option.text}</option>
                        })}
                    </select><br/>
                    <button id="login-submit-button" onClick={(e) => handleSubmit(e)}>Join Chat</button>
                </form>
            </div>
        </div>
    )
}

export default Login;