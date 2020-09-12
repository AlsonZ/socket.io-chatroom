
const messageFormat = (author, message) => {
  var today = new Date();
  return {
    author,
    message,
    date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  }
}


module.exports = {
  messageFormat
}