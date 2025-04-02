import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'in-person', 'phone'],
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  userId: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  }],
}, {
  timestamps: true,
});

export const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema); 