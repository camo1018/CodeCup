module.exports = function(app, modules) {

    /* Routes */
    app.post('/actions/users/register', function(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        
    });
}