// Halo - MongoDB Default Setup
// Paul Park

var async = require('async');
var mongoose = require('mongoose');
var mongoHostname = 'mongodb://107.170.116.232:27017/codecup';
mongoose.connect(mongoHostname);

var mongoDefinitions = require('./models/mongoDefinitions');

async.series([
    function(callback) {
        mongoDefinitions.User.collection.drop();

        var users = new Array();
        for (var i = 0; i < 50; i++) {
            var user = new mongoDefinitions.User( {
                username: 'User ' + i,
                codeivateUsername: 'camo1018',
                githubUsername: 'camo1018'
            });
            users.push(user);
        }

        async.each(users, function(user, subCallback) {
            user.save();
            subCallback();
        },
        function(err) {
            if (err)
                throw err;
            callback(null);
        });
    },
    function(callback) {
        console.log("Code Cup test database setup complete....\nExitting.");
        process.exit(0);
        callback(null);
    }
]);


