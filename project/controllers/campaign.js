const express 	= require('express');
const bodyParser    = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser 			  = bodyParser.urlencoded({extended : false});
const userModel = require('../models/userModel');
const campaignmodel = require('../models/campaignmodel');
const router 	= express.Router();



router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/addcampaign', (req, res)=>{
	res.render('campaign/addcampaign');
});


router.post('/addcampaign',urlencodedParser,[
	check('title','Title field can not be empty!!')
		.exists()
		.not().isEmpty()
		.trim(),
	check('description', 'Description Name field cannot be empty')
		.exists()
		.not().isEmpty()
		.trim(),
	check('targetfund','Target fund Field Can not be Empty')
		.exists()
		.not().isEmpty(),
	check('publisheddate','Published Date Field Can not be Empty!!!')
		.exists()
		.not().isEmpty(),
	check('enddate','End Date Field can not be Empty')
		.exists()
		.not().isEmpty()
	
],(req,res)=>{
	
	const errors = validationResult(req); 
	if(!errors.isEmpty()){
		const alert = errors.array();
		res.render('campaign/addcampaign',{
			alert
		});	
	}
     else{ 
var id;
var imagename;
console.log(req.cookies['uname']);

  id = req.cookies['id'];

  if(req.files)
  {
      var file = req.files.image;
      imagename = file.name;
      images='/upload/'+imagename;
      file.mv('./upload/'+imagename,function(err){
      	if(err)
      	{
      		console.log(err);
      	}
      	else{
      		console.log(imagename+"uploaded");
      	}
      })
  }
	var campagin = {
		uid: id,
		targetfund: req.body.targetfund,
		raisedfund: '0',
		ctype: 1,
		description: req.body.description,
		publisheddate: req.body.publisheddate,
		enddate: req.body.enddate,
		image: images,
		status: 1,
		title: req.body.title
	};
	console.log(campagin);
	  campaignmodel.insert(campagin,function(status){
	 	if(status){
	 		res.redirect('/campaign/campaignlist');
			
	 }else{
		res.render('/campaign/addcampaign');
		}
	 });
	}	  
});

 router.get('/campaignlist', (req, res)=>{
	campaignmodel.getAll(function(results){
		
		res.render('campaign/campaignlist', {campaigns: results, msg : req.query.msg});
	});
	
	
});

router.get('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publishDate/:endDate/:title', (req, res)=>{
	var currentCampaign = {
		//uid : req.params.uid,
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		publishDate: req.params.publishDate,
		endDate: req.params.endDate,
		title: req.params.title
	};
	res.render('campaign/edit', currentCampaign);
});

router.post('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:title', (req, res)=>{
	
	var Campaigns = {
		id : req.params.id,
		target_fund : req.body.target_fund,
		raisedfund : req.body.raisedfund,
		campaigntype : req.body.campaigntype,
		description : req.body.description,
		image : req.body.image,
		publishdDate : req.body.publishDate,
		enddate : req.body.enddate,
		title : req.body.title
	};
	campaignmodel.update(Campaigns, function(status){
		if(status){
			res.redirect('/campaign/campaignlist');
		}else{
			res.redirect('/campagin/edit');
		}
	});
});


router.get('/delete/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{
	
	var currentCampaign = {
		uid : req.params.uid,
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		publisedDate: req.params.publisedDate,
		endDate: req.params.endDate,
		status: req.params.status,
		title: req.params.title
	};
	res.render('campaign/delete', currentCampaign);
});
router.post('/delete/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{
console.log(req.params.id);
	var campaign = {
		id : req.params.id
	};
	campaignmodel.delete(campaign, function(status){
		if(status){
			res.redirect('/campaign/campaignlist');
		}else{
			res.redirect('/campaign/delete');
		}
	});
});
router.get('/report/:id/:uid', (req, res)=>{
	res.render('campaign/report');
	
});

router.post('/report/:id/:uid', (req, res)=>{
	
	var currentCampaign = {
		id : req.params.id,
		uid : req.params.uid,
		description : req.body.Description
	};
	campaignmodel.report(currentCampaign, function(status){
		if(status){
			var mg = encodeURIComponent('*reported!');
			res.redirect('/campaign/campaignlist?msg='+mg);
		}else{
				
		}
	});
	
});

router.get('/contactadmin', (req, res)=>{
	res.render('campaign/contactadmin');
	
});

router.post('/contactadmin', (req, res)=>{
	
	var currentCampaign = {
		uid : req.cookies['uid'],
		description : req.body.Description
	};
	campaignmodel.contactadmin(currentCampaign, function(status){
		if(status){
			var mg = encodeURIComponent('**Message-sent**');
			res.redirect('/campaign/contactadmin?msg='+mg);
		}else{
				
		}
	});
	
});

router.get('/bookmark/:id/:uid', (req, res)=>{
	
	var currentCampaign = {
		id : req.params.id,
		uid : req.params.uid
	};
	campaignmodel.check(currentCampaign, function(status){
		if(status){
			campaignmodel.bookmarks(currentCampaign, function(status){
			if(status){
				var mg = encodeURIComponent('**bookmarked!');
				res.redirect('/campaign/campaignlist?msg='+mg);
			}else{
				
			}
		});
		}else{
			var mg = encodeURIComponent('**already bookmarked!');
			res.redirect('/campaign/campaignlist?msg='+mg);
		}
	});
	
});

router.get('/view/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publishDate/:endDate/:title', (req, res)=>{
	var currentCampaign = {
		uid : req.params.uid,
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		publishDate: req.params.publishDate,
		endDate: req.params.endDate,
		title: req.params.title
	};
	res.render('campaign/view', currentCampaign);
});

module.exports = router;