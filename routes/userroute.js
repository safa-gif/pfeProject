const express = require('express');
const router = express.Router();
const user = require ('../controllers/userController');

router.post('/register',user.signup);
router.post('/login', user.signin);
// router.get('/username', user.verifyToken, user.findUser);
module.exports = router;