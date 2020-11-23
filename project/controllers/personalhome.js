const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const campaignmodel = require.main.require('./models/campaignmodel');
const router 	= express.Router();

 router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{

	campaign = {
		id : req.cookies['uid']
	}
	campaignmodel.history(campaign, function(results){

		res.render('personalhome/index', {campaign: results, name: req.cookies['uname'], id : req.cookies['uid']});
	});
	
	//res.render('personalhome/index', {name: req.cookies['uname']});
});




router.post('/show', (req, res)=>{
	console.log(req.body.name);
	// title = {
	// 	name : req.body.name
	// };
       
	campaignmodel.search(req.body.name, function(results){
		if(results){
			console.log(results[0]);
			res.json({campaign:results[0]});
		}else{
			res.json({campaign:'error'});
		}
	});
});


module.exports = router;