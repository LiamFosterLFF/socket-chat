import React, { useState, useContext } from 'react';
import { MessageContext } from '../hooks/MessageContext';

const Message = ({ message }) => {
    return (
        <div className="message-outer-box">
            <div className="message-metadata">
                <div className="metadata-text">{message.user}</div>
                <div className="metadata-text">{message.time}</div>
            </div>
            <div className="message-content">{message.content}</div>
        </div>
    )
}


const Chat = (props) => {
    const [ messageInput, setMessageInput ] = useState("")
    const { messages, users } = useContext(MessageContext);

    return (
        <div id='chat-outer-wrapper'>
            <div id='chat-top-bar'>
                <div>Socket Chat</div>
                <button>Leave Room</button>
            </div>
            <div id='chat-middle-bar'>
                <div id="chat-middle-left-side-bar">
                    <div id="chat-room-name">
                        <div id="chat-group-title">Room Name</div>
                        <div id="chat-room-name">{props.roomName}</div>
                    </div>
                    <div id="chat-users-group">
                        <div id="chat-group-title">Users</div>
                        <div id="chat-users-list">
                            {users.map((user, id) => {
                                return <div key={id}>{user.name}</div>
                            })}
                        </div>
                    </div>
                </div>
                <div id="chat-middle-right-side-bar">
                    <div id="chat-message-scroll">
                        {messages.map((message, id) => {
                            return <Message key={id} message={message}/>
                        })}
                    </div>
                </div>
            </div>
        <div id="chat-bottom-bar">
            <input id="chat-message-bar" placeholder="Enter Message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></input>
        </div>
    </div>
    )
}

export default Chat;