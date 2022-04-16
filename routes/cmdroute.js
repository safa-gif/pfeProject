const express = require('express');
const router = express.Router();
const cmd = require('../controllers/commandeController');

router.get('/', cmd.retrieve);

module.exports = router;
