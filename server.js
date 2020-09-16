const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { createUser, getUser } = require('./utils/users');
const { messageFormat } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'client')));

const serverName = 'Server';

io.on('connection', (socket) => {
  // user joins a room
  socket.on('joinRoom', ({username, room}) => {
    console.log(`${username} has joined room ${room}`)
    const user = createUser(socket.id, username, room);
    socket.join(user.room);

    // welcome the user
    io.to(user.room).emit('message', messageFormat('Server', `Welcome ${user.username}`));
  });

  // user sends a message
  socket.on('chatMessage', (data) => {
    const user = getUser(socket.id);

    // send message to all users including author
    io.to(user.room).emit('message', messageFormat(user.username, data.message));
  }); 


});


server.listen(process.env.PORT || 3000, () => {console.log(`Server is running on port ${server.address().port}`)})