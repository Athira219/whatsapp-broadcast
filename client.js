const { io } = require("socket.io-client");

const userId = "user123"; 

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(` Connected to server with socket ID: ${socket.id}`);
  socket.emit("register", userId);
});

socket.on("receive_message", (data) => {
  console.log(" New message received:");
  console.log(data);
});

process.stdin.resume();
