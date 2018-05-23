
const express 		= require('express'),
	  app     		= express(),
	  bodyParser 	= require('body-parser'),
	  url			= require('url'),
	  port    		= process.env.PORT || 3000;

//Indicates where is the css file of the index.html located
app.use('/assets', express.static(`${__dirname}/public`));
app.use('/images', express.static(`${__dirname}/includes`));

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

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/hello.html`)
})


//Get All Categories
app.get('/categories', (req, res) => {

    console.log('GET request: /getAllCategories');

    functionality.getAllCategories()

        .then(

            (category) => {

                if (!category.length) {

                    console.log('no data return');

                } else {

                    res.json(category);

                }

            }, (error) => {

                console.log(error);

            });

});


//Get Specific Category by ID
app.get('/categories/:category_id',
	(req, res) => {
		 console.log('GET request: /categories/category_id');

    functionality.getCategoryById(req.params.category_id)

        .then(

            (category) => {

                if (category == undefined || category == null) {

                    res.status(400).send(`The category with id ${req.params.category_id} was not found`);


                } else {
                    res.status(200).json(category);

                }

            }, (error) => {

                console.log(error);
                res.status(500).send(`Oops! There was a internal server error, try again later..`);

            });
				
		});



//Get Category that one of its subcategories status is 'status' AND subject is 'subject'
app.get('/subcategories/:status/:subject',
		(req, res) => {
		 console.log('GET request: /subcategories/:status/:subject');

		functionality.getCategoriesStatusAndSubject(req.params.status, req.params.subject)

        .then(

            (category) => {

                if (category == undefined || category == null) {

                    res.status(400).send(`There is not category that one of its subcategories has status ${req.params.status} and has subject ${req.params.subject}`);


                } else {
                    res.status(200).json(category);

                }

            }, (error) => {

                console.log(error);
                res.status(500).send(`Oops! There was a internal server error, try again later..`);

            });
    });
	



//Get category by name with POST request
app.post('/categorybyname', 
	(req, res) => {
		 console.log('POST request: /categorybyname');
		 var category = req.body.categoryname;
		 functionality.getCategoryByPostName(category)

        .then(

            (category) => {

                if (category == undefined || category == null) {

                    res.status(400).send(`There is not category with name ${req.body.categoryname}`);


                } else {
                    res.status(200).json(category);

                }

            }, (error) => {

                console.log(error);
                res.status(500).send(`Oops! There was a internal server error, try again later..`);

            });

	
	});
  


app.listen(port, 
	() => {
		console.log(`listening on port ${port}`);
	})

