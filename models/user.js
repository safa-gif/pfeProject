const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema
const userSchema = new Schema ({
    email: {
        work: {type: mongoose.SchemaTypes.Email, required: true},
        home: {type: mongoose.SchemaTypes.Email, required: true},

    },
    password : {
        type: String,
        required: true
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;