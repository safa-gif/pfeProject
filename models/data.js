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
     type: Number,
     require: true,
    },
    semiane_prod: {
        type: Number,
        require: true,
    },
    cmd_mois: {
        type: Number,
        require: true,
    },
    cmd_annee :{
        type: Number,
        require: true,
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