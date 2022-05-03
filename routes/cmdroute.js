const express = require('express');
const router = express.Router();
const cmd = require('../controllers/commandeController');

router.get('/', cmd.retrieve);
router.get('/:item_number', cmd.getElmentById);
router.get('/totalCmdsDate/:item', cmd.cmdparDate);

module.exports = router;
