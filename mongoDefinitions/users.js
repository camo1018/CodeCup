var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {type: String, unique: true}
})