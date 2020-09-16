const socket = io();
const sendButton = document.getElementById('sendButton');
const messageText = document.getElementById('messageText');
const messages = document.getElementById('messages');
const messageList = document.getElementById('messageList');


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

socket.on('message', data => {
  console.log(data);
  showMessage(data);
})

const showMessage = ({author, message}) => {
  let newMessage = document.createElement('li');
  newMessage.textContent += `[${author}] ${message}`;
  messageList.appendChild(newMessage);
  messageText.value = '';
}