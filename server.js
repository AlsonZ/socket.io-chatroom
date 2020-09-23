const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { createUser, getUser, removeUser, getRoomUsers } = require('./utils/users');
const { messageFormat } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'client'), { extensions: ['html', 'htm'] }));

io.on('connection', (socket) => {
  // user joins a room
  socket.on('joinRoom', ({username, room}) => {
    console.log(`${username} has joined room ${room}`)
    const user = createUser(socket.id, username, room);
    socket.join(user.room);

    // welcome the user
    io.to(user.room).emit('message', messageFormat('Server', `Welcome ${user.username}`));
    sendRoomUserList(user.room);
  });

  // user sends a message
  socket.on('chatMessage', (data) => {
    const user = getUser(socket.id);

    // send message to all users including author
    io.to(user.room).emit('message', messageFormat(user.username, data.message));
  }); 

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      // removed successfully
      io.to(user.room).emit('message', messageFormat('Server', `${user.username} has left`));
      sendRoomUserList(user.room);
    }
  });

  const sendRoomUserList = (room) => {
    io.to(room).emit('userList', {
      room: room,
      users: getRoomUsers(room)
    });
  }
});




server.listen(process.env.PORT || 3000, () => {console.log(`Server is running on port ${server.address().port}`)})