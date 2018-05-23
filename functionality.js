var consts = require('./consts');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the model
var group = require('./categories');

//I choose to create a Class that contains all the functionnality 
//to do for each route an return result to the module that calls it

class Functionality{


	constructor(){};
	//Executed on get always
	midleware(){
		console.log('midleware signature!');
	}

	//Executes on get /categories
	getAllCategories()
	{
		mongoose.connect(consts.MLAB_KEY);
        return new Promise((resulve , reject)=>{

            group.find({} , (err , category)=>{

                if(err){

                    reject(`error : ${err}`);

                }else{

                    console.log('<-getAllCustomers->\n' + category);

                    resulve(category);

                }

            });

        });
	}
 

	//Executed on get /categories/:category_id
	getCategoryById(catid){
        mongoose.connect(consts.MLAB_KEY);
        return new Promise((resulve , reject)=>{
            group.findOne({ 'categoryid': catid }, (err , category)=>{

                if(err){

                    reject(`error : ${err}`);

                }else{

                    console.log('<-getAllCustomers->\n' + category);

                    resulve(category);

                }

            });

        });
    }

	//Executes on get /subcategories/:status/:subject
	getCategoriesStatusAndSubject(status, subject){
        mongoose.connect(consts.MLAB_KEY);
        return new Promise((resulve , reject)=>{
            group.findOne({ "subcategories": { "$elemMatch": { "status": status, "subject": subject  } } } , (err , category)=>{

                if(err){

                    reject(`error : ${err}`);

                }else{

                    console.log('<-getAllCustomers->\n' + category);

                    resulve(category);

                }

            });

        });
    }


	//Executed on /categorybyname (POST)
	getCategoryByPostName(catname){
        mongoose.connect(consts.MLAB_KEY);
        return new Promise((resulve , reject)=>{
            group.findOne({ 'categoryname': catname }, (err , category)=>{

                if(err){

                    reject(`error : ${err}`);

                }else{

                    console.log('<-getAllCustomers->\n' + category);

                    resulve(category);

                }

            });

        });
    }
}
	

var exportModule = new Functionality();

module.exports = exportModule;