var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {type: String, unique: true},
    codeivateUsername: String,
    githubUsername: String
    // TODO: Password (bcrypt)
});
exports.User = mongoose.model('User', userSchema);


