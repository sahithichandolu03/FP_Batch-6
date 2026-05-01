const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  id: String,
  title: String,
  explanation: String,
});

const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  topics: [TopicSchema],
});

module.exports = mongoose.model('Course', CourseSchema);