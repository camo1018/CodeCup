module.exports = function(app, modules) {
    app.get('/home', function(req, res) {
        res.render('home.html');
    });
}