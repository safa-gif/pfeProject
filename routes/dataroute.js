const express = require('express');
const router = express.Router();
const info = require ('../controllers/dataController');

router.get('/', info.display);
// router.get('/count', information.countDistinct);
// router.get('/all', information.all)

module.exports = router;
