const express = require('express');
const { register, login, refreshAccessToken, logout, me } = require('../controllers/auth_controller');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.get('/me', authenticateJWT, me);
router.post('/logout', logout);

module.exports = router;
