const express = require('express');
const {
    register,
    login,
    getMe,
    walletLogin,
    getAllUsers
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/wallet-login', walletLogin);
router.get('/me', protect, getMe);
router.get('/users', getAllUsers); // Không cần protect để admin blockchain có thể truy cập

module.exports = router;
