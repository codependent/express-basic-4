var authMid = require('./authorization');
var routes = require('../routes');
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var morgan = require("morgan");


exports.config = function(app, express, path, passport, flash, dataCfg){
	app.use(express.static(path.join(__dirname+"/../..", 'public')));
	app.use(favicon(path.join(__dirname+"/../..", 'public', 'favicon.png')));
	app.use(morgan('combined'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: false }))	
	app.use(methodOverride(function (req, res) {
	  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method
	    delete req.body._method
	    return method
	  }
	}));
	app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	//authorization filter
	app.use('/private', authMid.check);

	//routes
	routes.config(app, passport, dataCfg);

	//Error handling
	app.use(notFoundHandler);
	// development only
	/*if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}*/
	app.use(logErrors);
	app.use(ajaxErrorHandler);
	app.use(errorHandler);

}

function notFoundHandler(req, res, next){
	res.status(404);
  	// respond with html page
  	if (req.accepts('html')) {
  		res.render('error', { title:"Error", error: '404 Página no encontrada' });
  		return;
  	}
  	// respond with json
  	if (req.accepts('json')) {
 	 	res.send({ error: 'Not found' });
  		return;
  	}
  	// default to plain-text. send()
  	res.type('txt').send('Not found');
}	

function logErrors(err, req, res, next) {
	console.error("ERROR! "+err.stack);
	next(err);
}

function ajaxErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up!' });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { title:"Error", error: err });
}