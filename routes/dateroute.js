const express = require('express');
const router = express.Router();
const date = require('../controllers/dateController');

router.get('/schedule', date.findEl);
module.exports = router;