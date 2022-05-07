const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commandeSchema = new Schema({
    item_number :
    {
     type : String,
         },
    item_name : {
        type : String,
            },
    besoin : {
        type: Number,
            },
    calendar_year : {
          type: Number,
          
    },
    planning_date:{
    type: Date,
    
    },
    order_number:  {
     type: Number,
         },
    status_order : {
        type: Number,
            },
    customer_name: {
        type: String,
        
       }
})
const Commande = mongoose.model('commande', commandeSchema);
module.exports = Commande;