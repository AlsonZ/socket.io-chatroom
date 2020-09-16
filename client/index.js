const socket = io();

const usernameInput = document.getElementById('usernameText');
const roomNameInput = document.getElementById('roomText');
const joinButton = document.getElementById('joinRoom');

joinButton.addEventListener('click', () => {
  // should have error msg here 
  const username  = usernameInput.value;
  const room = roomNameInput.value;
  socket.emit('joinRoom', {username, room});
});


