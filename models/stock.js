const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const stockSchema = new Schema ({
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
    }

})

const Stock = mongoose.model('stock', stockSchema);
module.exports = Stock;