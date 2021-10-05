import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MessageContext } from '../hooks/MessageContext';

import { BiPlug } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'
import { BsChatDots } from 'react-icons/bs'


const Message = ({ message }) => {
    if (message.type === "userMessage") {
        return (
            <div className="user-message-outer-box">
                <div className="user-message-metadata">
                    <div className="user-metadata-text">{message.user}</div>
                    <div className="user-metadata-text">{message.time}</div>
                </div>
                <div className="user-message-content">{message.content}</div>
            </div>
        )
    } else if (message.type === "botMessage") {
        return (
            <div className="bot-message-outer-box">
                    <div className="bot-message-content">{message.content}</div>
                    <div className="bot-message-metadata">{message.time}</div>
            </div>
        )
    }
}


const Chat = () => {

    const { roomName, username } = useParams();
    const [ messageState, messageFunctions ] = useContext(MessageContext);
    const [ messageInput, setMessageInput ] = useState("")
    const history = useHistory();

    const messageBar = useRef(null);
    const bottomMessage = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (messageInput.length !== 0) {
            messageFunctions.addMessage(messageInput);
            setMessageInput("");
            messageBar.current.focus();
        }
    };

    const handleLeaveRoom = () => {
        setMessageInput("")
        history.push(`/login`)
        messageFunctions.leaveRoom()

    }

    useEffect(() => {
        bottomMessage.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end"})
    }, [bottomMessage, messageState])

    return (
        <div id='chat-outer-wrapper'>
            <div id='chat-top-bar'>
                <div id="chat-top-bar-box">
                    <div id='chat-top-bar-logo'>
                        <BiPlug className="icon"/>
                        Socket Chat</div>
                    <button id='chat-top-bar-button' onClick={() => handleLeaveRoom()}>Leave Room</button>
                </div>
            </div>
            <div id='chat-middle-bar'>
                <div id="chat-middle-left-side-bar">
                    <div id="chat-group-name-box">
                        <div id="chat-group-title">
                            <BsChatDots className="icon"/>
                            Room 
                        </div>
                        <div id="chat-group-name">{roomName}</div>
                    </div>
                    <div id="chat-users">
                        <div id="chat-users-title">
                            <GrGroup className="icon"/>
                            Users
                        </div>
                        <div id="chat-users-list">
                            {messageState.users.map((user, id) => {
                                return <div className="chat-users-list-options" key={id}>{user.username}</div>
                            })}
                        </div>
                    </div>
                </div>
                <div id="chat-middle-right-side-bar">
                    <div id="chat-message-scroll">
                        {messageState.messages.map((message, id) => {
                            return <Message key={id} message={message}/>
                        })}
                        <div ref={bottomMessage}/>
                    </div>
                </div>
            </div>
        <div id="chat-bottom-bar">
            <form id='chat-message-bar'>
                <input 
                    ref={messageBar}
                    id='chat-message-bar-input'
                    placeholder="Enter Message" 
                    value={messageInput} 
                    onChange={(e) => setMessageInput(e.target.value)} 
                />
                <button type="submit" onClick={e => handleSubmit(e)} id='chat-message-bar-button'><FiSend className="icon"/> Send</button>
            </form>
            
        </div>
    </div>
    )
}

export default Chat;