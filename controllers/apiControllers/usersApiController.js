module.exports = function(app, modules) {

    /* Functions */
    var loginAsUser = function(req, username) {
        req.session.username = username;
    }

    var logoutUser = function(req) {
        req.session.username = null;
    }

    /* Routes */
    app.post('/actions/users/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var codeivateUsername = req.body.codeivateUsername;
        var githubUsername = req.body.githubUsername;

        if (username == null || username == '') {
            res.send('username-empty');
            return;
        }

        // Password comes in already hashed.  The hash of an empty string is da39a3ee5e6b4b0d3255bfef95601890afd80709.
        if (password == null || password == '' || password == 'da39a3ee5e6b4b0d3255bfef95601890afd80709') {
            res.send('password-empty');
            return;
        }

        modules.MongoDefinitions.User.find({ username: username }, 'username', function(err, users) {
            if (err)
                throw err;
            if (users.length > 0) {
                res.send('username-exists');
                return;
            }
        })

        modules.Bcrypt.genSalt(10, function(err, salt) {
            modules.Bcrypt.hash(password, salt, function(err, hash) {
                if (err)
                    throw err;
                var newUser = new modules.MongoDefinitions.User( {
                    username: username,
                    password: hash,
                    salt: salt,
                    codeivateUsername: codeivateUsername,
                    githubUsername: githubUsername
                });
                newUser.save();
                res.send('registered');
            });
        });
    });

    app.post('/actions/users/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var passwordHash = '';

        modules.Async.series([
            function(callback) {
                modules.MongoDefinitions.User.findOne({ username: username }, function(err, user) {
                    if (err)
                        throw err;

                    if (user == null || user.length == 0) {
                        res.send('login-fail');
                        callback('login-fail');
                    }
                    else {
                        passwordHash = user.password;
                        callback(null);
                    }
                })
            },
            function(callback) {
                modules.Bcrypt.compare(password, passwordHash, function(err, result) {
                    if (err)
                        throw err;
                    if (result == true) {
                        loginAsUser(req, username);
                        res.send('login-success');
                    }
                    else {
                        res.send('login-fail');
                    }
                    callback(null);
                });
            }
        ], function(err) {}
        );
    });

    app.post('/actions/users/logout', function(req, res) {
        logoutUser(req);
        res.send('good');
    });

    app.get('/actions/users/getSessionUser', function(req, res) {
        res.send(req.session.username);
    });
}