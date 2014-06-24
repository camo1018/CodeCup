// Code Cup NodeJS Server
// Paul Park

var portNumber = 8000;

var express = require('express');
var ejs = require('ejs');
var async = require('async');
var request = require('request');

var mongoose = require('mongoose');
var mongoHostname = 'mongodb://107.170.116.232:27017/codecup';
mongoose.connect(mongoHostname);

mongoose.connection.once('open', function(err) {
    if (err) {
        throw err;
    }
	console.log('Connected to mongodb');
});

var app = express();

app.use(express.cookieParser());
app.use(express.session({ secret: 'PVM10fJACoOpAw' }));

app.configure(function() {
    app.set('views', __dirname+'/views');
    app.set('view options', { pretty: true });
    app.set('view engine', 'html');
    app.engine('.html', ejs.renderFile);
    app.use(express.static(__dirname+'/public'));
})

// Load Mongo Definitions
var mongoDefinitions = require('./mongoDefinitions/mongoDefinitions.js');

// Index page route
app.get('/', function(req, res) {
    res.render('index.html');
});

//  Controller Initialization
require('./controllers/homeController.js')(app, request);

// Api Controller Initialization
require('./controllers/apiControllers/codeivateApiController.js')(app, request, async);

console.log('CodeCup NodeJS Instance started at port ' + portNumber);
app.listen(portNumber);