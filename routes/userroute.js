const express = require('express');
const router = express.Router();
const user = require ('../controllers/userController');

router.post('/login',user.loginUser);
router.post('register',user.createUser);
module.exports = router;