import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MessageContext } from '../hooks/MessageContext';

import { BiPlug } from 'react-icons/bi'

const Login = () => {
    const history = useHistory();

    const options = [
        {id: "javascript", text: "Javascript"},
        {id: "python", text: "Python"},
    ]

    const [ username, setUsername ] = useState("");
    const [ group, setGroup ] = useState(options[0]);
    const [ showTooltip, setShowTooltip ] = useState(false);

    const [ , { joinRoom } ] = useContext(MessageContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username !== "") {
            joinRoom(username, group.text)
            history.push(`/chat/${group.text}/${username}`)
        } else {
            setShowTooltip(true)
            setTimeout(() => {
                setShowTooltip(false)
            }, 5000);
        }
    }

    return (
        <div id='login-outer-wrapper'>
            <div id='login-upper-bar'>
                <div id="login-logo">
                    <BiPlug />
                    Socket Chat
                </div>
            </div>
            <div id='login-lower-bar'>
                <form>
                    <div className="login-form-grouping">
                        <label id="login-username-label" className="login-label" htmlFor="username">
                            <div id="login-username-text">Username:</div>
                            <div id="login-username-tooltip">{showTooltip ? "Username cannot be blank" : ""}</div>
                        </label>
                        <input id="login-username-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>                       
                    </div> 
                    <div className="login-form-grouping">
                        <label id="login-group-label" className="login-label" htmlFor="group">Group:</label>
                        <select id="login-group-select" list="groups" name="group" value={group.text} onChange={e => setGroup(options.find(option => option.text === e.target.value))}>
                            {options.map((option, ind) => {
                                return <option className="login-group-select-option" key={ind} value={option.text} >{option.text}</option>
                            })}
                        </select><br/>
                    </div> 
                    <button id="login-submit-button" onClick={(e) => handleSubmit(e)}>Join Chat</button>
                </form>
            </div>
        </div>
    )
}

export default Login;