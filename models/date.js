const mongoose = require ('mongoose');
const Schema  = mongoose.Schema
const dateSchema = new Schema ({
    item_number :
    {
     type : String,
     required: true
    },
    order_number:  {
        type: Number,
        required: true
       },
    planning_date: {
        type : String,
        required: true
    },
    jour : {
        type: Number,
        required: true
    },
    semaine_cmd:{
    type: Number,
    required: true,
    },
    semaine_prod: {
     type: Number
    },
    semiane_prod: {
        type: Number
    },
    mois_cmd: {
        type: String,
    },
    annee_cmd :{
        type: Number
    }

})
const DateModel = mongoose.model('date', dateSchema);
module.exports = DateModel;