const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const broadcastRoutes = require('./broadcast-routing');
const { setupSocket } = require('./socket');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use('/broadcast', broadcastRoutes);

// Initialize Socket.IO
setupSocket(io);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});