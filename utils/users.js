const users = [];

const createUser = (id, username, room) => {
  const user = { id, username, room }
  users.push(user);
  return user;
}

const getUser = (id) => {
  return users.find(user => user.id === id);
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);

  if(index !== -1) {
    // return the removed user to determine if removed properly
    return users.splice(index, 1)[0];
  }

}

const getRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}


module.exports = {
  createUser,
  getUser,
  removeUser,
  getRoomUsers
}