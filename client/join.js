const roomName = document.getElementById('roomName');


const init = () => {
  let room = getQuery('room');
  roomName.textContent = `Room: ${room}`;
  
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

init();