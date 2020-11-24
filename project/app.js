//declaration
const express 			        = require('express');	
const bodyParser 		        = require('body-parser');
const exSession 		        = require('express-session');
const cookieParser 		        = require('cookie-parser');
const personalregistration	    = require('./controllers/personalregistration');
const login			            = require('./controllers/login');
const logout			        = require('./controllers/logout');
const personalhome		        = require('./controllers/personalhome');
const home		                = require('./controllers/home');
const upload 	                = require('express-fileupload');
const campaign				    = require('./controllers/campaign');
const $                         = require('jquery');
const path                      = require('path');
const pdf                       = require('pdf').pdf;
const fs                        = require('fs');
const app				        = express();
const port				        = 3000;


//configuration
app.set('view engine', 'ejs');


//middleware
app.use(upload());
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
app.use(express.static(path.join(__dirname+'/public'))); 

app.use('/login', login);
app.use('/home', home);
app.use('/personalregistration', personalregistration);
app.use('/personalhome',personalhome);
app.use('/logout', logout);

app.use('/campaign', campaign);


//router

app.get('/', (req, res)=>{
	res.send('Welcome');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});