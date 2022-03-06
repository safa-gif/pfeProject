const mongoose = require('mongoose');
const dataModel = require('./data');
const db = require('../database/db.config');

// function count(query= {}, projection= {}) {
//     dataModel.find(query, project)
// }

dataModel
.aggregate( [
    {$match : {planning_date: /2022-03/}},
    {$group: {
        _id: $item_status, status_count: { $sum: 1} 
    }
    },
    {
     $project: {}
    }
    .then((orders)=> {
        orders.forEach((order)=> console.log(order));
    })
    .cath((error)=> {
        throw error
    })
])