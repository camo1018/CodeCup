var async = require('async');
exports.Async = async;

var request = require('request');
exports.Request = request;

var mongoose = require('mongoose');
var mongoHostname = 'mongodb://107.170.116.232:27017/codecup';
mongoose.connect(mongoHostname);
exports.Mongoose = mongoose;

var mongoDefinitions = require('./models/mongoDefinitions.js');
exports.MongoDefinitions = mongoDefinitions;

var linq = require('linq');
exports.LINQ = linq;