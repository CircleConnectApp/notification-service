import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    default: "663b7c9a9147f2f9fc7cf8a1" 
  },
  type: {
    type: String,
    required: true,
    enum: ['POST', 'LIKE', 'COMMUNITY_UPDATE', 'INFO'] 
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.model('Notification', notificationSchema);
