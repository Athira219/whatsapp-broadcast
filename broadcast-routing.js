const express = require('express');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { senderId, message, recipientIds } = req.body;

  try {
    const results = await sendBroadcast(senderId, message, recipientIds);
    res.status(200).json({ message: 'Broadcast sent!', results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Broadcast failed' });
  }
});

module.exports = router; 