const express = require('express');
const path = require('path');
//const aws = require('aws-sdk');
//const searches = require('./models/searches');
const { Client } = require('pg');
//const bootstrap = require('bootstrap');
const exphbs = require('express-handlebars');
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
		title: 'THENEWUSED',
		brandnames: list
});


	});
		});

app.get('/brand/create', function (req,res){
	res.render('create_brand',{
		title: 'THENEWUSED',
	});
});	

// end of brand

//start of category

app.post('/categorieslist',function(req,res){
	var values =[];
	values=[req.body.categoryname];
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


app.get('/category/create', function (req,res){
	res.render('create_category',{
		title: 'THENEWUSED',
	});
});	

app.get('/categorieslist', function(req, res) {
	client.query('SELECT * FROM products_category',(req,data)=>{
		var list = []
		for (var i=1; i< data.rows.length+1; i++){
		list.push(data.rows[i-1]);
	}

	res.render('categorieslist', {
		title: 'THENEWUSED',
		brandnames: list
});


	});
		});

//end of category

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
		title: 'NEW ARRIVAL',
		price: '1500'
		
	});
});		

app.get('/men',function(req,res){
	res.render('men',{
		title: "MEN'S COLLECTION",
	});
});		

app.get('/women',function(req,res){
	res.render('women',{
		title: "WOMEN'S COLLECTION",

	});
});	



app.get('/create_products',function(req,res){
	res.render('create_products',{
		title: 'THENEWUSED',
	});
});	


app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at port 3000');
});

