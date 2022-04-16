const express = require('express');
const router = express.Router();
const stock = require ('../controllers/stockController')
router.get('/getStock', stock.findStock);

module.exports = router;