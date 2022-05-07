const express = require('express');
const router = express.Router();
const stock = require ('../controllers/stockController')
// const paginator = require('../middlewares/functions')

//getAllDataWithPaginatorAPI
router.get('/', stock.findStock);
//getStockItems
router.get("/totalItems",stock.countTotalItems);
//getStockItemFrequent
router.get('/frequent', stock.countFrequent)

module.exports = router;