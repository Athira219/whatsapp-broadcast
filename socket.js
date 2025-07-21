let io;
const userToSocketMap = {};

function setupSocket(_io) {
  io = _io;

  io.on('connection', (socket) => {
    console.log(` New client connected: ${socket.id}`);

    // Now registering with phone number instead of userId
    socket.on('register', (phoneNumber) => {
      userToSocketMap[phoneNumber] = socket.id;
      console.log(`📱 User with phone ${phoneNumber} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(` Client disconnected: ${socket.id}`);

      for (const phone in userToSocketMap) {
        if (userToSocketMap[phone] === socket.id) {
          delete userToSocketMap[phone];
          console.log(` Cleaned up phone ${phone}`);
        }
      }
    });
  });
}

function getSocketId(phoneNumber) {
  return userToSocketMap[phoneNumber];
}

function getIO() {
  return io;
}

module.exports = { setupSocket, getSocketId, getIO };
