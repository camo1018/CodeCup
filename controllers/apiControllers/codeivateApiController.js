module.exports = function(app, modules) {

    /* Functions */

    // Get Codeivate User Info for a single user.
    var getCodeivateUser = function(username, callback) {
        modules.Request('http://codeivate.com/users/' + username + '.json', function(error, response, body) {
            if (error) {
                throw error;
            }
            callback(body);
        });
    };

    // Retrieve Codeivate User Info for multiple users.
    var getCodeivateUsers = function(usernames, callback) {
        var result = new Array();

        modules.Async.eachSeries(usernames, function(username, subCallback) {
            getCodeivateUser(username, function(body) {
               if (body != '')
                    result.push(body);
               subCallback();
            });
        }, function(err) {
            if (err) {
                throw err;
            }
            callback('[' + result.join(',') + ']');
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
        modules.MongoDefinitions.User.find({}, 'codeivateUsername', function(err, documents) {
            var usernames = modules.LINQ.from(documents).select(function(document) { return document.codeivateUsername}).toArray();
            getCodeivateUsers(usernames, function(body) {
                res.json(body);
            })
        });
    });
}
