module.exports = function(app, request) {
    var getSingleUserInfo = function(username, callback) {
        console.log('Getting Codeivate user information for ' + username);
        request('http://codeivate.com/users/' + username + '.json', function(error, response, body) {
            if (error) {
                throw error;
            }

            callback(body);
        });
    };

    // takes a single username or an array of usernames
    this.getCodeivateUserInfo = function(username, callback) {
        if (username instanceof Array) {
            var completedCount = 0;
            var result = [];
            // try to make all requests simultaneously...
            username.forEach(function(element, index, array) {
                console.log("request " + element);
                // AFAICT we can only request info one user at a time
                getSingleUserInfo(element, function(body) {
                    result[index] = body;
                    completedCount++;
                    // ...and callback when the last one completes
                    if (completedCount === username.length) {
                        callback('[' + result.join(',') + ']');
                    }
                })
            })
        } else {
            getSingleUserInfo(username, callback);
        }
    };

    this.getAllCodeivateUserInfo = function(callback) {
        var usernames = ["swilliams", "camo1018", "ptolemy"];
        getCodeivateUserInfo(usernames, function(body) {
            callback(body);
        });
    };

    app.get('/actions/getCodeivateUserInfo', function(req, res) {
        var username = req.query.username;
        getCodeivateUserInfo(username, function (body) {
            res.json(body);
        });
    });

    app.get('/actions/getAllCodeivateUserInfo', function(req, res) {
        getAllCodeivateUserInfo(function(body) {
            res.json(body);
        })
    });
}
