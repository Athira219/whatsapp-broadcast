const { io } = require("socket.io-client");

const phoneNumber = "+918078304281";

// Connect to your backend server
const socket = io("http://localhost:3000");

// When connected, register this phone number
socket.on("connect", () => {
  console.log(`✅ Connected to server with socket ID: ${socket.id}`);
  socket.emit("register", phoneNumber);
});

// Listen for incoming messages
socket.on("receive_message", (data) => {
  console.log("📩 New message received:");
  console.log(data);
});

// Keep script running
process.stdin.resume();
