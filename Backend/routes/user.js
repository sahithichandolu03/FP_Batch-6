const express = require('express');
const router = express.Router();
const { getDashboard, getMe } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, getMe);
router.get('/dashboard', auth, getDashboard);

module.exports = router;