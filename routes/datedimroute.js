const express = require('express');
const router = express.Router();
const dim = require('../controllers/date_dim_cmdController');


router.get('/',dim.retrieve);

router.get('/retards',dim.retards);

router.get('/retardsSemaine', dim.RetardsSemaine);

router.get('/retardsAnnee',dim.RetardsAnnee);

router.get('/retardsMois', dim.RetardsMois);


module.exports = router;