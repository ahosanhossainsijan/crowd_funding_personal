const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	 var user = {
		username: req.body.username,
		password: req.body.password
	};


	 userModel.validate(user, function(results){

		if(results[0].type == 1){
	 		res.cookie('uname', req.body.username);
	 		res.cookie('id',results[0].id);
	 		res.redirect('/personalhome');
	 	}
		else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;