var express = require('express');
var middlewares = require('./middlewares');
var passportCfg = require('./passport');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport')
var DBENGINE = 'mongoose';
var dataCfg = require('./model/'+DBENGINE+"-cfg");

var app = express();

//Init db
dataCfg.connect(function(error) {
	if (error) throw error;
});
app.on('close', function(errno) {
	console.log("cerrando app")
	dataCfg.disconnect(function(err) {console.log("error al desconectar de bbdd") });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passportCfg.config(passport);

middlewares.config(app, express, path, passport, flash, dataCfg);

app.listen(app.get('port'));
