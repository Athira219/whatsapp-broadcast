let io;
const userToSocketMap = {};

function setupSocket(_io) {
  io = _io;

  io.on('connection', (socket) => {
    console.log(` New client connected: ${socket.id}`);

    socket.on('register', (userId) => {
      userToSocketMap[userId] = socket.id;
      console.log(`👤 User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(` Client disconnected: ${socket.id}`);

      for (const userId in userToSocketMap) {
        if (userToSocketMap[userId] === socket.id) {
          delete userToSocketMap[userId];
          console.log(` Cleaned up user ${userId}`);
        }
      }
    });
  });
}

function getSocketId(userId) {
  return userToSocketMap[userId];
}

function getIO() {
  return io; 
}

module.exports = { setupSocket, getSocketId, getIO };
