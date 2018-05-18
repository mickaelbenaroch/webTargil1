
const express 		= require('express'),
	  data    		= require("./data/category.json"),
	  app     		= express(),
	  bodyParser 	= require('body-parser'),
	  url			= require('url'),
	  port    		= process.env.PORT || 3000;

//Instance of the class that contains functionnality for each route
var functionality = require('./functionality.js');


app.use(bodyParser.json()); //parsing application/json
app.use(bodyParser.urlencoded({extended: true})); //parsing application/x-www-form-urlencoded

//MiddleWare always matched
app.all('*',
	(req, res, next) => {
		functionality.midleware();
		next();
	});

//Get All Categories
app.get('/categories', (req, res) => {
	var response = functionality.getAllCategories();
	res.status(200).json({"categories": response});
});

//Get Specific Category by ID
app.get('/categories/:category_id',
	(req, res) => {
				var response = functionality.getCategoryById(req.params.category_id);
				res.status(200).json({"category": response});
		});

//Get All Categories that its status is 'status' AND subject is 'subject'
app.get('/categories/:status/:subject',
	(req, res) => {
				var response = functionality.getCategoriesStatusAndSubject(req.params.status, req.params.subject);
				res.status(200).json({"categories founds": response});
		});

//Get category by name with POST request
app.post('/categorybyname', 
	(req, res) => {
		var category = req.body.categoryname;
		var response = functionality.getCategoryByPostId(category);
		res.json({"category found": response});
	});

//Put request to change number of books of category's subcategory 
app.put('/category/subcategory/updatenumberofbooks', 
	(req, res) => {
		var subcatid  = req.body.subcategoryid;
		var newNumOfBooks = req.body.newnumberofbooks;
		var response = functionality.changeNumOfBooks(subcatid, newNumOfBooks);
		res.json({"Result": response});
	});

app.listen(port, 
	() => {
		console.log(`listening on port ${port}`);
	})

