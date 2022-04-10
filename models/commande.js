const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const commandeSchema = new Schema({
    item_number :
    {
     type : String,
     required: true
    },
    item_name : {
        type : String,
        required: true
    },
    on_hand_balance : {
        type: Number,
        required: true
    },
    planning_date:{
    type: Date,
    required: true,
    },
    semaine_cmd: {
     type: Number
    },
    semiane_prod: {
        type: Number
    },
    customer_name: {
     type: String,
     required: true,
    },
    order_number:  {
     type: Number,
     required: true
    },
    besoin : {
        type: Number, 
        required:true
    },
    status_order : {
        type: Number,
        required: true
    }
})
const Commande = mongoose.model('commande', commandeSchema);
module.exports = Commande;