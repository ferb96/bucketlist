// Connect to the database
require('./api/db.js');

// Initialize the app
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

// Define the port to run on
app.set('port', 3000);

// Add middleware to console every request
app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'static')));
app.use('/node_modules', express.static(path.join(__dirname,'/node_modules')));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(bodyParser.json());

app.use('/api',routes);

// Listen for requests
var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
	console.log("Magic happens on port " + port);
});
