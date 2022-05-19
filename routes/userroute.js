const express = require('express');
const router = express.Router();
const user = require ('../controllers/userController');

//signup
router.post('/register',user.signup);
//signin
router.post('/login',user.login);
//getAllUsers:
router.get('/findAll', user.findAll);
//count users
router.get('/count',user.count);
//update User
router.put('/updateUser/:id', user.updateUser);

//delete User
router.delete('/deleteUser/:id',user.deleteUser);

// router.findUser('/findUser/:id',user.findUser);

router.get('/getSingleUser/:id', user.getSingleUser)
module.exports = router;