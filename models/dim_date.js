const mongoose = require('mongoose');
const Schema = mongoose.Schema
var dim_date = 
mongoose.model('dim_date', new Schema({ 
    planning_date:Date, 
    month:String,
    week: Number, 
    week_prod:Number, 
    calendar_year:String,
    order_number: Number,
},
     { collection : 'dim_date' }));   // collection name;
dim_date.find({}, function(err, data) 
{ console.log(err, data, data.length);});