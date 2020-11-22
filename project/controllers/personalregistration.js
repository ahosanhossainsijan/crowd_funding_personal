const express 		= require('express');
const uppercase     = require('upper-case');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('personalregistration/index');
});

router.post('/',(req,res)=>{
	
     //var x=0;
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
    // userModel.getAll(function(results){
    // 	for (var i = 0; i < results.length; i++) {
    // 		if (results[i].username === user.username) {
    //             x++;
    // 		}
    // 		else{}
    // 	}

    // });
    
    // if(x>0){
    // 	res.redirect('/personalregistration');
    // }
    // 	else{
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
 
})

module.exports = router;