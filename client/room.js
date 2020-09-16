const socket = io();

const checkIfLoggedIn = () => {
  // grab room and username from localStorage if needed.
  const username = localStorage.getItem('username');
  const room = localStorage.getItem('room');
  if(!room || !username) {
    window.location.href="index.html";
  }
  socket.emit('joinRoom', {username, room});
}
checkIfLoggedIn();

socket.on('message', message => {
  console.log(message);
})

