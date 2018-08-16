const express = require('express');
const path = require('path');
//const aws = require('aws-sdk');
//const searches = require('./models/searches');
const { Client } = require('pg');
//const bootstrap = require('bootstrap');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
// instantiate client using your DB configurations
/*const client = new Client({
	database: 'KART ENGLATERA',
	user: 'postgres',
	password: 'engrkye19',
	host: 'localhost',
	port: 5432

*/


var user;
var pass;
var nodemailer = require('nodemailer');

var id;
var description;
var idprice;
var prod_name;
var prod_price;

const client = new Client({
	database: 'ddanjjrmfktufr',
	user: 'izhcgjbnymylig',
	password: '671b18195a9481308ae6f4d75630f94949ccf6d59309c4ec99b49dc4dbe680b4',
	host: 'ec2-50-19-86-139.compute-1.amazonaws.com',
	port: 5432,
	ssl: true

});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});



const app = express();
// tell express which folder is a static/public folder
app.use(express.static(path.join(__dirname, 'public')));
//
app.engine('handlebars',exphbs ({defaultlayout:'main'}));
app.set('view engine','handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
	res.render('home', {
		title: 'THENEWUSED',
});
	});

// start pf brand
app.post('/brandlist',function(req,res){
	var values =[];
	values=[req.body.brandname,req.body.description];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO brands(name,description) VALUES ($1,$2)",values,(err,res)=>{
		if (err){
			console.log(err.stack)
		}
		else{
			console.log('brand successfully added')
		}
	});
	res.redirect('/brandlist');
});

app.get('/brandlist', function(req, res) {
	client.query('SELECT * FROM brands',(req,data)=>{
		var list = []
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('brandlist', {
		title: 'THENEWUSED_brands',
		brandnames: list
});


	});
		});

app.get('/brand/create', function (req,res){
	res.render('create_brand',{
		title: 'THENEWUSED_brands',
	});
});	

// end of brand






//start of category

app.post('/categorieslist',function(req,res){
	var values =[];
	values=[req.body.categoryname];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO products_category(name) VALUES ($1)",values,(err,res)=>{
		if (err){
			console.log(err.stack)
		}
		else{
			console.log('category successfully added')
		}
	});
	res.redirect('/categorieslist');
});


app.get('/categorieslist', function(req, res) {
	client.query('SELECT * FROM products_category',(req,data)=>{
		var list = []
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('categorieslist', {
		title: 'THENEWUSED_categories',
		categorynames: list
});


	});
		});

app.get('/category/create', function (req,res){
	res.render('create_category',{
		title: 'THENEWUSED_categories',
	});
});	

//end of category

// start of products
app.post('/products',function(req,res){
	var values =[];
	values=[req.body.productname,req.body.description,req.body.tagline,req.body.price,req.body.warranty,req.body.image];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO products(product_name,product_description,tagline,price,warranty,images) VALUES ($1,$2,$3,$4,$5,$6)",values,(err,res)=>{
		if (err){
			console.log(err.stack)
		}
		else{
			console.log('product successfully added')
		}
	});
	res.redirect('/products');
});

app.get('/products', function(req, res) {
	client.query('SELECT * FROM products',(req,data)=>{
		var list = [];
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('products', {
		title: 'THENEWUSED_products',
		products: list
});


	});
		});

app.get('/product/create', function (req,res){
	res.render('create_products',{
		title: 'THENEWUSED_products',
	});
});	

//productview
app.get('/product/:idNew', function (req,res){ 
	const idNew=req.params.idNew;

		var list1 = [];
		var list = [];
	client.query("SELECT * FROM products where id="+idNew+" ",(req,data2)=>{
		for (var i=0; i< data2.rowCount; i++){
		list1[i] = data2.rows[i] ;
		} list = list1;
		id = idNew;

	 res.render('productview',{
		title: 'THENEWUSED_products',
		products: list[0]
	});  
});	
	});	
// end of products



app.get('/success', function (req,res){
	res.render('success',{
		title: 'THENEWUSED_brands',
	});
});	



app.get('/fail', function (req,res){
	res.render('fail',{
		title: 'THENEWUSED_brands',
	});
});	

// start of customers
app.post('/customers',function(req,res){

	console.log(req.body);

	var receivers = ['team2.dbms1819@gmail.com', req.body.email];

	// client.query("INSERT INTO customers(email,first_name,last_name,street,municipality,province,zipcode) VALUES ($1,$2,$3,$4,$5,$6,$7)") //,values,(err,res)=>{
	// 	if (err){
	// 		console.log(err.stack)
	// 	}
	// 	else{
	// 		console.log('customers successfully added')
	// 	}
	
	   //	.then((results)=>{

let mailOptions, transporter;
transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'team2.dbms1819@gmail.com',
        pass: 'database1819'
    }
});
	console.log(req.body);
	
mailOptions = {
        //from: req.body.FN+'  &lt; '+ req.body.LN +'   &lt;' + req.body.email +' &gt;', // sender address
        from: 'team2.dbms1819@gmail.com', // list of receivers
        to: receivers,
        subject: 'ORDER DETAILS', // Subject line
        text: "Order Details: \n Name:" + req.body.first_name + req.body.last_name +  "\n Email:" + req.body.email + "\n Product ID:" + id ,

    };

    console.log(mailOptions);

 // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
				res.redirect('/fail');    
				    }
        // else
        // {

				client.query("INSERT INTO customers (email,first_name,last_name,street,municipality,province,zipcode) VALUES ('"+req.body.email+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.street+"','"+req.body.municipality+"','"+req.body.province+"','"+req.body.zipcode+"')") 
					.then((result)=>{
						res.redirect('/customers');  


						// console.log(err.stack)
						// 	res.redirect('/fail');    

					})
					.catch((err) => {
						console.log('error',err);
						res.send('Error!');
						res.redirect('/fail');    

					});


    });
   });


	// 		 	else{
	// 					console.log('customers successfully added')

	// 			 	}

	//}

							
					
// mailOptions = {
//         from: 'team2.dbms1819@gmail.com', // sender address
//         to: req.body.email, // list of receivers
//         subject: 'NEW ORDER', // Subject line
//         text: "Order Details: \n Name:" + req.body.first_name + req.body.last_name  + "\n Email:" + req.body.email + "\n Product ID:" + id,
 
//     };

//     console.log(mailOptions);
//  transporter.sendMail(mailOptions, function (error, response) {
//         if (error) {
// 				res.redirect('/fail');    
// 				    }
//         else
//         {

// 	client.query("INSERT INTO customers (email,first_name,last_name,street,municipality,province,zipcode) VALUES ('"+req.body.email+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.street+"','"+req.body.municipality+"','"+req.body.province+"','"+req.body.zipcode+"')")
// 	if (err){
// 			console.log(err.stack)
// 				res.redirect('/fail');    

// 		}
// 	 	else{
// 			console.log('customers successfully added')
// 						res.redirect('/success');  

// 	 	}
// 					  	}


// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }

	
//	
/*
FN = req.body.FN, 
LN = req.body.LN,
CNumber = req.body.contactnumber,
Email = req.body.email,
//ProdID = id,
*/
//console.log(values);

 //  res.redirect('/customers');
//});

// });

// });

app.get('/customers', function(req, res) {
	client.query('SELECT * FROM customers',(req,data)=>{
		var list = []
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('customers', {
		title: 'THENEWUSED_customers',
		customers: list
});


	});
		});


app.post('/customers_details',function(req,res){
	var values =[];
	values=[req.body.email,req.body.first_name,req.body.last_name];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO customers(email,first_name,last_name) VALUES ($1,$2,$3)",values,(err,res)=>{
		if (err){
			console.log(err.stack)
		}
		else{
			console.log('customers successfully added')
		}
	});
	res.redirect('/customers_details');
});

app.get('/customers_details', function(req, res) {
	client.query('SELECT * FROM customers',(req,data)=>{
		var list = []
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('customers_details', {
		title: 'THENEWUSED_customers',
		customers: list
});


	});
		});

// end of customers

app.get('/home', function(req, res) {
	res.render('home', {
		title: 'THENEWUSED',
});
	});

app.get('/api/products', function(req, res) {

	client.query('SELECT * FROM Products', (req, data)=>{
		console.log(data.rows);
		res.json({
			data: data.rows
		})
	})
});

app.get('/newarrival',function(req,res){
	res.render('newarrival',{
		title: 'THENEWUSED_new arrival',
		price: '1500'
		
	});
});		

app.get('/men',function(req,res){
	res.render('men',{
		title: "THENEWUSED_men's collection",
	});
});		

app.get('/women',function(req,res){
	res.render('women',{
		title: "THENEWUSED_women's collection",

	});
});	



app.get('/create_products',function(req,res){
	res.render('create_products',{
		title: 'THENEWUSED_products',
	});
});	

app.get('/customers',function(req,res){
	res.render('customers',{
		title: 'THENEWUSED_customers',
	});
});	

app.get('/orders',function(req,res){
	res.render('orders',{
		title: 'THENEWUSED_orders',
	});
});	



//POST ORDER
app.post('/orderform', function (req,res){
var idNew = req.params.id;
/*
FN = req.body.FN, 
LN = req.body.LN,
CNumber = req.body.contactnumber,
Email = req.body.email,
//ProdID = id,
*/
//console.log(values);

	
let mailOptions, transporter;
transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'team2.dbms1819@gmail.com',
        pass: 'database1819'
    }
});
	console.log(req.body);
	
mailOptions = {
        from: req.body.email,
        //from: req.body.FN+'  &lt; '+ req.body.LN +'   &lt;' + req.body.email +' &gt;', // sender address
        to: 'team2.dbms1819@gmail.com', // list of receivers
        subject: 'ORDER DETAILS', // Subject line
        text: "Order Details: \n Name:" + req.body.FN + req.body.LN + "\n Contact Number:" + req.body.contactnumber + "\n Email:" + req.body.email + "\n Product ID:" + id ,

    };

    console.log(mailOptions);

 // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
				res.render('fail');    
				    }
       else{  /* KART... ETO UNG DI MAINSERT SA CUSTOMERS.. DAPAT MAINSERT SYA PAG NAGSUCCESS UNG PAG SEND SA EMAIL.. SALAMAT */  
//       		console.log(req.body)
//	        	client.query("INSERT INTO customers (first_name,last_name,street,municipality) VALUES ('"+req.body.FN+"','"+req.body.LN+"','"+req.body.address+"', '"+req.body.contactnumber"','"+req.body.email+"')");
//
					res.render('success');
       }
							
					
mailOptions = {
        from: 'team2.dbms1819@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'NEW ORDER', // Subject line
        text: "Order Details: \n Name:" + req.body.FN + req.body.LN + "\n Contact Number:" + req.body.contactnumber + "\n Email:" + req.body.email + "\n Product ID:" + id,
 
    };

    console.log(mailOptions);
 transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
				res.render('fail');    
				    }
        else
        {
				res.render('success');   
    	}


transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

    });
});
});







app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at port 3000');
});

