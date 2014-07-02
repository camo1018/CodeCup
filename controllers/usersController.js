module.exports = function(app, modules) {
    app.get('/users/register', function(req, res) {
       res.render('users/register.html');
    });

    app.get('/users/login', function(req, res) {
       res.render('users/login.html');
    });
}
