const express = require('express');
const router = express.Router();
const user = require ('../controllers/userController');

// const isAuth = require("./");

router.post('/register',user.signup);

router.post('/login',user.login);
//getAllUsers:
router.get('/findAll', user.findAll);

router.get('/count',user.count);



module.exports = router;