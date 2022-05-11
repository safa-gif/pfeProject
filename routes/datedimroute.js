const express = require('express');
const router = express.Router();
const dim = require('../controllers/date_dim_cmdController');


router.get('/',dim.retrieve);
router.get('/retards',dim.retards);
router.get('/retardsSemaine', dim.RetardsSemaine)

module.exports = router;