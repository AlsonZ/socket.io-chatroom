const express = require('express');
const http = require('html');
const socketio = require('socket.io');
const path = require('path');
const {createUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'client')));

const serverName = 'Server';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({username, room}) => {
    const user = createUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit('message', )
  })
});
