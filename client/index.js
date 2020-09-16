const socket = io();

const usernameInput = document.getElementById('usernameText');
const roomNameInput = document.getElementById('roomText');
const joinButton = document.getElementById('joinRoom');

joinButton.addEventListener('click', () => {
  const username  = usernameInput.value;
  const room = roomNameInput.value;
  if(username === '' || username === ' ' || room === '' || room === ' ') {
    // socket.emit('joinRoom', {username, room});
    // should have error msg here 
    return;
  }
  localStorage.setItem('room', room);
  localStorage.setItem('username', username);
  window.location.href="room.html";
});


