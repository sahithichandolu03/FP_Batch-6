const express = require('express');
const router = express.Router();
const { getQuizByCourseId, submitQuiz } = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/:courseId', getQuizByCourseId);
router.post('/submit', auth, submitQuiz);

module.exports = router;