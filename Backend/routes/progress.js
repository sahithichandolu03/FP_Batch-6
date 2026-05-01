const express = require('express');
const router = express.Router();
const { saveProgress, getProgress } = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.post('/save', auth, saveProgress);
router.get('/', auth, getProgress);

module.exports = router;
