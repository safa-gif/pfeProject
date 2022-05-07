const express = require('express');
const router = express.Router();
const pdp = require ('../controllers/pdpController');

//get all data
router.get('/', pdp.getAll);
//getSingleData
// router.get('/test/:id',pdp.getElement)
module.exports = router