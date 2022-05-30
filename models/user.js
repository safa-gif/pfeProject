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
//compare password
userSchema.methods.comparepassword =  async function (enteredpassword) {
    return  await  bcrypt.compare(enteredpassword,this.password)
}
//token 
userSchema.methods.getJwtToken =   async function() {
    return  await jwt.sign({id:this._id}, "SDJFOW850FJSLDFJ4095809DFJG045FGRASA45klkhsqjhsqhs12828SZ",{
    expiresIn: "7d"
})

}
const User = mongoose.model('Users',userSchema);

module.exports = User;