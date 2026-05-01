const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  topicScores: {
    type: Map,
    of: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Result', ResultSchema);