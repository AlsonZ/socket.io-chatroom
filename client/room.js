const socket = io();
const sendButton = document.getElementById('sendButton');
const messageText = document.getElementById('messageText');
const messages = document.getElementById('messages');
const messageList = document.getElementById('messageList');
const userList = document.getElementById('userList');
const roomLink = document.getElementById('roomLink');


const checkIfLoggedIn = () => {
  // grab room and username from localStorage if needed.
  const username = localStorage.getItem('username');
  const room = localStorage.getItem('room');
  if(!room || !username) {
    window.location.href="/";
  }
  socket.emit('joinRoom', {username, room});
}
checkIfLoggedIn();

const loadRoomName = () => {
  const roomName = document.getElementById('roomName');
  const room = localStorage.getItem('room');
  roomName.textContent = room;
}
loadRoomName();

roomLink.onclick = () => {
  const room = localStorage.getItem('room');
  const url = window.location.host;
  navigator.clipboard.writeText(`${url}/j/${room}`)
    .then(()=> {
      const tooltip = document.getElementById('tooltip');
      tooltip.textContent = "Success";
      tooltip.style.backgroundColor = "lightgreen";
    })
}

socket.on('message', data => {
  showMessage(data);
});

socket.on('userList', data => {
  console.log(data);
  userList.innerHTML="<li>Users</li>";
  data.users.forEach(user => {
    const newUser = document.createElement('li');
    newUser.innerText = user.username;
    userList.appendChild(newUser);
  });
});

const sendMessage = () => {
  if(messageText.value === '' || messageText.value === ' ') {
    return;
  }
  const data = {
    message : messageText.value,
  }
  socket.emit('chatMessage', data);
}

sendButton.onclick = () => {
  sendMessage();
}
messageText.addEventListener('keyup', (e) => {
  if(e.code === "Enter") {
    sendMessage();
  }
})

const showMessage = ({author, message}) => {
  let newMessage = document.createElement('li');
  newMessage.textContent += `[${author}] ${message}`;
  messageList.appendChild(newMessage);
  messageText.value = '';
}