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

	 res.render('productview',{
		title: 'THENEWUSED_products',
		products: list[0]
	});  
});	
	});	
// end of products


// start of customers
app.post('/customers',function(req,res){
	var values =[];
	values=[req.body.brandname,req.body.description];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO customers(email,first_name,last_name,street,municipality,province,zipcode) VALUES ($1,$2,$3,$4,$5,$6,$7)",values,(err,res)=>{
		if (err){
			console.log(err.stack)
		}
		else{
			console.log('customers successfully added')
		}
	});
	res.redirect('/customers');
});

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

app.get('/customer/add', function (req,res){
	res.render('customers',{
		title: 'THENEWUSED_customers',
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


app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at port 3000');
});

