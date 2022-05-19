const express = require('express');
const router = express.Router();
const cmd = require('../controllers/commandeController');


//GETAllCommandesWIthPaginatorAPI
router.get('/', cmd.retrieve);
//getCommandeByID
// router.get('/getElement/:id', cmd.getElmentById);
//CountTotalCommandesByDate
router.get('/totalCmds', cmd.cmdparYear);
//Total Des Comandes:
router.get('/total', cmd.totalCommandes);
//TotalCommandeByIdOrderumner:
router.get('/totalCmdId',cmd.totalCmdByCode);
router.get('/getelement',cmd.getElementById)
//totalCommandesAnnetest
router.get('/totalByYear',cmd.totalcmdAnnee)
module.exports = router;
