const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    completedTopics: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    },
    roadmap: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', ProgressSchema);
