const express = require('express');
const router = express.Router();
const info = require ('../controllers/dataController');

router.get('/', info.display);
router.get('/tester', info.getData);
router.get('/counter', info.countDistinct)

module.exports = router;
