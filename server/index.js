const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;
const server = http.createServer(app);
const io = socketIO(server);

const users = [];

app.use(cors());

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("joined", (data) => {
    users[socket.id] = data.user;
    console.log(`${data.user} has joined`);
    socket.broadcast.emit('userJoined', { user: 'Admin', message: `${users[socket.id]} has joined` });
    socket.emit("welcome", { user: "Admin", message: `Welcome to the chat ${users[socket.id]}` });
  });
  
  socket.on("disconnect",function(){
    socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has left`});
    console.log(`user left`);
  });
//   socket.on("message",function({message,id}){
//  io.emit('sendMessage',{user:users[id],message,id});
//   });
socket.on("message", function ({ message, id, user }) {
  io.emit('sendMessage', { user: users[socket.id], message, id: socket.id });
});
 
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
