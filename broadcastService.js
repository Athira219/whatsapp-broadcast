const { getIO, getSocketId } = require('./socket');

async function sendBroadcast(senderId, message, targetUserIds) {
  const io = getIO();
  const results = [];

  for (const userId of targetUserIds) {
    const socketId = getSocketId(userId);

    if (socketId) {
      io.to(socketId).emit('receive_message', {
        from: senderId,
        message,
      });
      results.push({ recipientId: userId, status: 'sent' });
    } else {
      results.push({ recipientId: userId, status: 'offline' });
    }
  }

  return results;
}

module.exports = { sendBroadcast };
