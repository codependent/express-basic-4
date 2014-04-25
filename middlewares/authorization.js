exports.check = function(req,res,next){
	console.log("aajjjj")

  if(typeof req.user != 'undefined'){
    console.log('autenticado '+req.user)
    next()
  }else{
    console.log('no autenticado - redirect ')
    req.flash('info', 'Flash is back!')
    res.redirect('/login')
  }
}