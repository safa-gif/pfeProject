const express = require('express');
const router = express.Router();
const cmd = require('../controllers/commandeController');

cmd.get('/', cmd.retrieve);

module.exports = router;
