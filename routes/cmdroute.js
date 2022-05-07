const express = require('express');
const router = express.Router();
const cmd = require('../controllers/commandeController');


//GETAllCommandesWIthPaginatorAPI
router.get('/', cmd.retrieve);
//getCommandeByID
router.get('/getElement/:id', cmd.getElmentById);
//CountTotalCommandesByDate
router.get('/totalCmds', cmd.cmdparYear);
//TotalCommandeByIdOrderumner:
router.get('/totalCmdId',cmd.totalCmdByCode);

module.exports = router;
