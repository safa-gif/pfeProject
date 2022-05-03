const mongoose = require('mongoose');
	const bcrypt = require('bcryptjs');
	const Schema = mongoose.Schema;

	const AccountSchema = new Schema({
	userName : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required:true
	},
	password : {
		type: String,
		required:true
	},
	joinedDate : {
		type : Date,
		required: true,
		default : Date.now()
	}
	});
	AccountSchema.methods.comparePassword = (clientPassword, password) => {
		return bcrypt.compareSync(clientPassword,password);
	};
module.exports = mongoose.model('Accounts', AccountSchema);
                    
                