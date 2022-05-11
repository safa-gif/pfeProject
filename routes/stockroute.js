const express = require('express');
const router = express.Router();
const stock = require ('../controllers/stockController')
// const paginator = require('../middlewares/functions')

//getAllDataWithPaginatorAPI
router.get('/', stock.findStock);

// //getStockItems
// router.get("/totalItems",stock.countTotalItems);

//getStockItemFrequent
router.get('/frequent', stock.countFrequent)
//  router.get('/statusP,stock.countFrequent')
//totalStock
router.get('/totalStocks',stock.totalStock);
//ProduitenRepture ou dander de rupture

router.get('/stockDanger',stock.stockEmpty);

router.get('/stockLoad',stock.stockLoaded);
// router.get('/stockDispo', stock.produitDisponible);

module.exports = router;