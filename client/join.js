const joinButton = document.getElementById('joinRoom');
const usernameInput = document.getElementById('usernameText');

const init = () => {
  const roomName = document.getElementById('roomName');
  let room = getQuery('room');
  roomName.textContent = `Room: ${room}`;
  if(roomName.textContent === `Room: ${room}`) {
    localStorage.setItem('room', room);
  }
}

const getQuery = (sParam) => {
  let variables = window.location.search.substring(1).split('&');
  for (let i = 0; i < variables.length; i++) {
    let sParameterName = variables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

joinButton.addEventListener('click', () => {
  const username  = usernameInput.value;
  if(username === '' || username === ' ') {
    // should have error msg here 
    return;
  }
  localStorage.setItem('username', username);
  window.location.href="room.html";
});

init();