
/*
 * GET home page.
 */
exports.index = function(req, res){
	console.log("aquiiiiiiiiiiii")
 	res.render('index', { title: 'Express' });
};