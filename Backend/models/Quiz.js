const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
  topic: String, // topicId
});

const QuizSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);