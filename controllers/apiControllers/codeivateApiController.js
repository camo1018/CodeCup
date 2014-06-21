module.exports = function(app, request) {
    app.get('/actions/getCodeivateUserInfo', function(req, res) {
        var username = req.query.username;
        console.log('Getting Codeivate user information for ' + username);
        request('http://codeivate.com/users/' + username + '.json', function(error, response, body) {
            if (error) {
                throw error;
            }

            res.json(body);
        });
    });

    app.get('/action/getAllCodeviateUserInfo', function(req, res) {
        // TODO
    });
}