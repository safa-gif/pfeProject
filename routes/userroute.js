const express = require('express');
const router = express.Router();
const user = require ('../controllers/userController');

router.post('/register',user.signup);
// router.post('/login', user.signin);
router.post('/loggin',user.loggin)
router.get('/findAll', user.findAll);

module.exports = router;