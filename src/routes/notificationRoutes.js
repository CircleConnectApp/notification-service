import express from 'express';
import Notification from '../models/Notification.js';
import { logger } from '../utils/logger.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; 
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(notifications);
  } catch (error) {
    logger.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});


router.post('/send', async (req, res) => {
  try {
    const { userId, type, message, data } = req.body;
    
    const notification = new Notification({
      userId,
      type,
      message,
      data
    });

    await notification.save();

    
    const io = req.app.get('io');
    io.to(userId).emit('notification', notification);

    logger.info(`Notification sent to user ${userId}: ${message}`);
    res.status(201).json(notification);
  } catch (error) {
    logger.error('Error sending notification:', error);
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
});


router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    logger.info(`Notification ${req.params.id} marked as read`);
    res.json(notification);
  } catch (error) {
    logger.error('Error updating notification:', error);
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
});

export default router; 