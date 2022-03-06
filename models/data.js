const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const dataSchema = new Schema ({
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
    cmd_mois: {
        type: Number
    },
    cmd_annee :{
        type: Number
    },
    customer_name: {
     type: String,
     required: true,
    },
    order_number:  {
     type: Number,
     required: true
    }

})

const Infos = mongoose.model('infos', dataSchema);
module.exports = Infos;