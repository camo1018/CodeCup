// Code Cup NodeJS Server
// Paul Park

var portNumber = 8000;

var express = require('express');
var ejs = require('ejs');

var modules = require('./modules');

modules.Mongoose.connection.once('open', function(err) {
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
});

// Index page route
app.get('/', function(req, res) {
    res.render('index.html');
});

//  Controller Initialization
require('./controllers/homeController.js')(app, modules);
require('./controllers/usersController.js')(app, modules);

// Api Controller Initialization
require('./controllers/apiControllers/codeivateApiController.js')(app, modules);

console.log('CodeCup NodeJS Instance started at port ' + portNumber);
app.listen(portNumber);