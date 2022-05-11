const express = require('express');
const router = express.Router();
const stock = require ('../controllers/stockController')

//getAllDataWithPaginatorAPI
router.get('/', stock.findStock);

//getStockItemFrequent
router.get('/frequent', stock.countFrequent)
//  router.get('/statusP,stock.countFrequent')
//totalStock
router.get('/totalStocks',stock.totalStock);
//ProduitenRepture ou dander de rupture

router.get('/stockDanger',stock.stockEmpty);

router.get('/stockLoad',stock.stockLoaded);



module.exports = router;