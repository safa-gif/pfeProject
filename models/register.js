const mongoose = require('mongoose');
// require('mongoose-type-email');
var Schema = mongoose.Schema

var loginuser = new Schema({
   email: {
       type:  String,
       required : true,
       trim : true
   },
   username
})