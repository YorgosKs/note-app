const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../routes/auth');

// Register User
router.post('/register', userCtrl.registerUser);
// Login User
router.post('/login', userCtrl.loginUser);

// verify Token
router.get('/verify', userCtrl.verifiedToken);

router.get('/getUsername', auth, userCtrl.getUsername);

module.exports = router;
