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

        var paul = new mongoDefinitions.User( {
            username: 'camo1018',
            codeivateUsername: 'camo1018',
            githubUsername: 'camo1018'
        });

        var michael = new mongoDefinitions.User( {
            username: 'ptolemy',
            codeivateUsername: 'ptolemy',
            githubUsername: 'ptolemy'
        });

        var stephan = new mongoDefinitions.User( {
            username: 'swilliams',
            codeivateUsername: 'swilliams',
            githubUsername: 'swilliams'
        });

        users.push(paul);
        users.push(michael);
        users.push(stephan);

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
        callback(null);
    }
]);

console.log("Code Cup test database setup complete....\nExitting.");
//process.exit(0);


