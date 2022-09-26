const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin, getCurrentUser, getRoomUsers, userLeave,
} = require('./utils/users');

const app = express();

const server = http.createServer(app);
const io = socketIO(server);
const botName = 'ChatCord Bot';

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    // Welcome current user
    socket.emit('message', formatMessage(botName, `Welcome to chatcord ${user.username}`));

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when a client disconnects
  socket.on('disconnect', () => [
    io.emit('message', formatMessage(botName, 'A user has left the chat')),
  ]);
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
