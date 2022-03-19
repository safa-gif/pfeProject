const express = require('express');
const router = express.Router();
const information = require('../controllers/functionController');
router.get('/aff', information.display);
router.get('/count', information.countDistinct);
router.get('/all', information.all)

module.exports = router;
