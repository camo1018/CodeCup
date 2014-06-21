module.exports = function(app, request) {
    app.get('/home', function(req, res) {
        res.render('home.html');
    });
}