const mongoose = require('mongoose');
// require('mongoose-type-email');
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs');
// const Schema = mongoose.Schema
// const userSchema = new Schema ({
//     email: {
//         work: {type: mongoose.SchemaTypes.Email, required: true},
//         home: {type: mongoose.SchemaTypes.Email, required: true},

//     },
//     password : {
//         type: String,
//         required: true
//     }
// })

var userSchema = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true},
    password:{type:String, require:true}
});

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

const User = mongoose.model('User',userSchema);
// const User = mongoose.model('User', userSchema);
module.exports = User;