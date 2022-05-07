const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const stockSchema = new Schema ({
    item_number :
    {
     type : String,
        },
    item_name : {
        type : String,
           },
    on_hand_balance : {
        type: Number,
           }

})

const Stock = mongoose.model('stock', stockSchema);
module.exports = Stock;