const express = require('express');
const router = express.Router();
const info = require ('../controllers/dataController');
const db = require('../database/db.config');

router.get('/', info.findEvery);
router.get('/:id',info.findOne);
router.post('/add', info.createCommande);
// router.get('/remove', function (req, res) {
//  db.collection('infos').aggregate(
//      [{$s : {size: 1}}].forEach(console.log)
     
//  )
// })

module.exports = router;
