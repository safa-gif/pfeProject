const mongoose = require ('mongoose');
const Schema  = mongoose.Schema
const dim_dateSchema = new Schema ({
    item_number :
    {
     type : String,
         },
    order_number:  {
        type: Number,
               },
    planning_date: {
        type : Date,
            },
            calendar_year:{
                 type: Number
                },
        week:{
        type: Number,
        
        },
        week_prod: {
        type: Number,
        
        },
        month: {
            type: String,
            
        },
        on_hand_balance : {
            type: String,
        },
        item_name : {
            type: String
        },
        customer_name : {
            type: String
        },
        besoin : {
            type: Number
        }

})
const DateDimModel = mongoose.model('dim_stock_date_cmd', dim_dateSchema);
module.exports = DateDimModel;