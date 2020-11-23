const express 		= require('express');
const uppercase     = require('upper-case');
const bodyParser    = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser 			  = bodyParser.urlencoded({extended : false});
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('personalregistration/index');
});

router.post('/',urlencodedParser,[
	check('name','Name field can not be empty!!')
		.exists()
		.not().isEmpty()
		.trim(),
	check('username', 'User Name field cannot be empty')
		.exists()
		.not().isEmpty()
		.trim(),
	check('email','Email Field Can not be Empty')
		.exists()
		.not().isEmpty()
		.isEmail()
		.withMessage('This is not a valid Email'),
	check('contact','contact Field Can not be Empty!!!')
		.exists()
		.not().isEmpty()
		.isLength({min : 11})
		.withMessage('Contact number must be atleast 11')
		.isLength({max : 13})
		.withMessage('Contact number can be up to 13'),
	check('gender','Gender Field can not be Empty')
		.exists()
		.not().isEmpty(),
	check('address','Address Field can not be Empty')
		.exists()
		.not().isEmpty(),	
	check('password','Password Field can not be Empty')
		.exists()
		.not().isEmpty()
	
],(req,res)=>{
	
	const errors = validationResult(req); 
	if(!errors.isEmpty()){
		const alert = errors.array();
		res.render('personalregistration/index',{
			alert
		});	
	}
     else{
    if(uppercase.upperCase(req.body.gender) == "MALE" ){
    	var user=
    {

        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contactno: req.body.contactno,
        gender: 0,
        address: req.body.address,
        password: req.body.password,
        type: 1,
        status: 1 

    };
}
    else if(uppercase.upperCase(req.body.gender) == "FEMALE"){
    	var user=
    {

        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contactno: req.body.contactno,
        gender: 1,
        address: req.body.address,
        password: req.body.password,
        type: 1,
        status: 1 

    };
    

    }

console.log(user);

     userModel.insert(user, function(status){

       if(status){
    
            console.log("Created");
           
            res.redirect('/login');
            
        }
       else{
              console.log("Error");  
              res.redirect('/personalregistration');
        }

     });
	     }
 
})

module.exports = router;