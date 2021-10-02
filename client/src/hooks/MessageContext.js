import React, { createContext } from 'react'
import moment from 'moment';

const userList = [
    {name: "Suzie"},
    {name: "Steve"},
    {name: "Mike"},
];

const chatMessages = [
  {user: "Steve", time: moment().format(' h:mm a'), content: "This is just a test"},
  {user: "Mike", time: "11pm", content: "This is also a test"},
  {user: "Suzie", time: "12pm", content: "This is just a message"},
];

const value = {
  messages: chatMessages,
  users: userList
}

export const MessageContext = createContext();

const MessageContextProvider = (props) => {
  return (
    <MessageContext.Provider value ={value}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageContextProvider;