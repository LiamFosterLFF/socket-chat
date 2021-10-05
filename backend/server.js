const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { addMessage, initializeState, getRoomState } = require('./utils/messageUtils');
const { userJoin, userLeave, getCurrentUser, getRoomUsers } = require('./utils/userUtils');

const app = express();

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "http://localhost:8080",
      // methods: ["GET", "POST"]
    }
});

const testState = {
  chatMessages: [
    {type: "userMessage", user: "Steve", time: "10 pm", content: "This is just a test"},
    {type: "userMessage", user: "Mike", time: "11pm", content: "This is also a test"},
    {type: "userMessage", user: "Suzie", time: "12pm", content: "This is just a message"},
    {type: "userMessage", user: "Steve", time: "10 pm", content: "This is just a test"},
    {type: "userMessage", user: "Mike", time: "11pm", content: "This is also a test"},
    {type: "userMessage", user: "Suzie", time: "12pm", content: "This is just a message"},
    {type: "userMessage", user: "Steve", time: "10 pm", content: "This is just a test"},
    {type: "userMessage", user: "Mike", time: "11pm", content: "This is also a test"},
    {type: "userMessage", user: "Suzie", time: "12pm", content: "This is just a message"},
  ]
}

initializeState({ "Javascript": testState, "Python": testState})


io.on('connection', socket => {
  console.log('New WS Connection...');
  const bot = {name: "ChatBot", type: "bot"}

  socket.on('joinRoom', ({ username, room }) => {
    
    // Get user, join to room, and update chat
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    io.to(user.room).emit('userUpdate', getRoomUsers(user.room));

    // Transmit initial state of room to user
    socket.emit('messageUpdate', getRoomState(user.room));
    
    // Broadcast to room that user has joined the chat
    socket.broadcast.to(user.room).emit('messageUpdate', addMessage(bot, user.room, `${user.username} has joined the chat`));
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('messageUpdate', addMessage(user, user.room, msg));
  })

  socket.on('leaveRoom', () => {
    const user = userLeave(socket.id);
    socket.leave(user.room);
    if(user) {
      io.to(user.room).emit('messageUpdate', addMessage(bot, user.room, `${user.username} has left the chat`));
      io.to(user.room).emit('userUpdate', getRoomUsers(user.room));
    }
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    socket.leave(user.room);
    if(user) {
      io.to(user.room).emit('messageUpdate', addMessage(bot, user.room, `${user.username} has left the chat`));
      io.to(user.room).emit('userUpdate', getRoomUsers(user.room));
    }
  });
});


const PORT = 5000 | process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));