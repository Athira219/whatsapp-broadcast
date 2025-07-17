const { getIO, getSocketId } = require('./socket');

async function sendBroadcast(senderId, message, recipientIds) {
  const io = getIO();
  const results = [];

  for (const recipientId of recipientIds) {
    const socketId = getSocketId(recipientId);

    if (socketId) {
      io.to(socketId).emit('receive_message', {
        from: senderId,
        message,
      });
      results.push({ recipientId, status: ' Sent' });
    } else {
      results.push({ recipientId, status: ' Offline' });
    }
  }

  return results;
}

module.exports = { sendBroadcast };
