import React, { useState, createContext } from 'react'
import io from 'socket.io-client';




export const MessageContext = createContext();

const socket = io('http://localhost:5000')


const MessageContextProvider = (props) => {

  const [ state, setState ] = useState({
    messages: [],
    users: []
  })

  socket.on('messageUpdate', serverState => {
    setState((current) => ({
      ...current,
      messages: serverState.chatMessages
    }));
  });

  socket.on('userUpdate', serverState => {
    setState(current => ({
      ...current,
      users: serverState
    }));
  })

  const addMessage = (msg) => {
    socket.emit('chatMessage', msg);
  }

  const joinRoom = (username, room) => {
    socket.emit("joinRoom", { username, room })
  }

  const leaveRoom = () => {
    socket.emit("leaveRoom");
  }

  const functions = {
    addMessage,
    joinRoom,
    leaveRoom
  }


  return (
    <MessageContext.Provider value ={[state, functions ]}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageContextProvider;