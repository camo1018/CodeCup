module.exports = function(app, request, async) {

    /* Functions */

    // Get Codeivate User Info for a single user.
    var getCodeivateUser = function(username, callback) {
        console.log('Getting Codeivate user information for ' + username);
        request('http://codeivate.com/users/' + username + '.json', function(error, response, body) {
            if (error) {
                throw error;
            }
            callback(body);
        });
    };

    // Retrieve Codeivate User Info for multiple users.
    var getCodeivateUsers = function(usernames, callback) {
        var result = new Array();

        async.each(usernames, function(username, subCallback) {
            console.log("Requesting " + username);
            getCodeivateUser(username, function(body) {
               result.push(body);
               subCallback();
            });
        }, function(err) {
            if (err) {
                throw err;
            }
            console.log('All users retrieved');
            callback('[' + result.join(',') + ']');
        });
    };

    var getAllCodeivateUsers = function(callback) {
        var usernames = ["swilliams", "camo1018", "ptolemy"];
        getCodeivateUsers(usernames, function(body) {
            callback(body);
        });
    };

    /* Routes */

    app.get('/actions/getCodeivateUser', function(req, res) {
        var username = req.query.username;
        getCodeivateUser(username, function (body) {
            res.json(body);
        });
    });

    app.get('/actions/getAllCodeivateUsers', function(req, res) {
        getAllCodeivateUsers(function(body) {
            res.json(body);
        })
    });
}
