// Halo - MongoDB Default Setup
// Paul Park

var async = require('async');
var mongoose = require('mongoose');
var mongoHostname = 'mongodb://107.170.116.232:27017/codecup';
mongoose.connect(mongoHostname);

var mongoDefinitions = require('./models/mongoDefinitions');

mongoDefinitions.User.collection.drop();

//process.exit(0);
console.log("Code Cup database clear complete....\nExitting.");


