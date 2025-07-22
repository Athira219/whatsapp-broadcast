const express = require('express');
const router = express.Router();
const { sendBroadcast } = require('./broadcastService');

router.post('/send', async (req, res) => {
  const { senderId, message, recipientIds } = req.body;

  try {
    const results = await sendBroadcast(senderId, message, recipientIds);
    res.status(200).json({ message: 'Broadcast sent!', results });
  } catch (error) {
    console.error('Broadcast Error:', error);
    res.status(500).json({ error: 'Broadcast failed' });
  }  
});

module.exports = router;
