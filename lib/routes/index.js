var indexRoute = require('./index-route');
var user = require('./user');
var priv = require('./private');
var notes = require('./notes');
var login = require('./login');
var logout = require('./logout');

exports.config = function(app, passport, dataCfg){
	app.get('/', indexRoute.index);
	app.get('/users', user.list);
	app.route('/login')
	.get(login.index)
	.post(passport.authenticate('local', 
		{ successRedirect: '/private',
			failureRedirect: '/login?loginError=-1',
			failureFlash: true }));
	app.get('/logout', logout.dologout);                                                    
	app.get('/private', priv.index);
	app.get('/private/notes', notes.index());
	app.get('/private/notes/add', notes.addForm);
	app.post('/private/notes', notes.add);
	app.get('/private/notes/edit', notes.editForm);
	app.put('/private/notes', notes.edit);
	app.delete('/private/notes/:id', notes.delete);

	//REST Services
	app.get('/private/services/notes', notes.index(dataCfg,true));
}