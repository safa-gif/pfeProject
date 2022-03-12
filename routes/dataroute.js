const express = require('express');
const router = express.Router();
const info = require ('../controllers/dataController');
const db = require('../database/db.config');

router.get('/', info.findEvery);
router.get('/:id',info.findOne);
router.get('/calcul', (req, res, next)=> {
    
})
router.post('/add', info.createCommande);

module.exports = router;
