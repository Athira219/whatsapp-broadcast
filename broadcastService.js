const { getIO, getSocketId } = require('./socket');

async function sendBroadcast(senderPhone, message, targetPhoneNumbers) {
  const io = getIO();
  const results = [];

  for (const phoneNumber of targetPhoneNumbers) {
    const socketId = getSocketId(phoneNumber);

    if (socketId) {
      io.to(socketId).emit('receive_message', {
        from: senderPhone,
        message,
      });
      results.push({ recipientPhone: phoneNumber, status: 'sent' });
    } else {
      results.push({ recipientPhone: phoneNumber, status: 'offline' });
    }
  }

  return results;
}

module.exports = { sendBroadcast };
