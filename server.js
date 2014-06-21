// Code Cup NodeJS Server
// Paul Park

var portNumber = 8000;

var express = require('express');
var ejs = require('ejs');
var async = require('async');

var app = express();

app.use(express.cookieParser());
app.use(express.session({ secret: 'PVM10fJACoOpAw' }));

app.configure(function() {
    app.set('views', __dirname+'/views');
    app.set('view options', { pretty: true });
    app.set('view engine', 'html');
    app.engine('.html', ejs.renderFile);
    app.use(express.static(__dirname+'/public'));
});

// Index page route
app.get('/', function(req, res) {
    res.render('index.html');
});

console.log('Code Cup NodeJS Instance started at port ' + portNumber);
app.listen(portNumber);
