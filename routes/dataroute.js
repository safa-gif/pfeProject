const express = require('express');
const router = express.Router();
const info = require ('../controllers/dataController');

router.get('/', info.display);
router.get('/count', info.countDistinct);
router.get('/all', info.test);

module.exports = router;
