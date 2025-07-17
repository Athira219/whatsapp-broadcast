let io;
const userSocketMap = {}; // userId -> socketId

function setupSocket(_io) {
  io = _io;

  io.on('connection', (socket) => {
    console.log(' New client connected:', socket.id);

    socket.on('register', (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`👤 User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(' Client disconnected:', socket.id);
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
        }
      }
    });
  });
}

function getSocketId(userId) {
  return userSocketMap[userId];
}

function getIO() {
  return io;
}

module.exports = { setupSocket, getSocketId, getIO };
