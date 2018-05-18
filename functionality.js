var data = require("./data/category.json");


//I choose to create a Class that contains all the functionnality 
//to do for each route an return result to the module that calls it

class Functionality{

	constructor(){};
	//Executed on get always
	midleware(){
		console.log('midleware signature!');
	}

	//Executes on get /categories
	getAllCategories(){
		console.log('get: all categories!');
		var categories = data.categories;
		console.log("data: " + categories);
		return categories;
	}

	//Executed on get /categories/:category_id
	getCategoryById(catid){
		console.log('get: category by id');
		let foundCategory= false;
		for(let i in data.categories){
			var CatFound = data.categories[i].categoryid;
			if(CatFound == catid){
				foundCategory = true;
				return data.categories[i];
			}
		}
		if(!foundCategory){
			var notfound = "category not found";
			return notfound;
			}
		}

	//Executes on get /categories/:status/:subject
	getCategoriesStatusAndSubject(status, subject){
		console.log(`get: which categories with subject ${subject} and status ${status}`);
		let foundCategory= false;
		for(let i in data.categories){

			for(let j in data.categories[i].subcategories){

				//Variable for status comparaision
				var CatFound  = data.categories[i].subcategories[j].status;
				
				//Variable for numberofbooks comparaision
				var CatFound2 = data.categories[i].subcategories[j].subject; 
				
				//Runs on each status and numberofbooks and compares
				if((CatFound == status) && (CatFound2 == subject)) {
					foundCategory = true;
					return data.categories[i];
				}		
			}
		
		}
		if(!foundCategory){
			var notfound = `There are not categories with status ${status} and subject ${subject}`;
			return notfound;
			}
		}

	//Executed on /categorybyname (POST)
	getCategoryByPostId(catname){
		console.log(`post: searching category with name ${catname}`);
		let foundCategory= false;
		for(let i in data.categories){

			//Variable for name comparaision
			var CatFound  = data.categories[i].categoryname;
			
			//Runs on each status and numberofbooks and compares
			if(CatFound == catname) {
				foundCategory = true;
				return data.categories[i];
			}
		}
		if(!foundCategory){
			var notfound = `There are not categories with name ${status}`;
			return notfound;
			}
		}

	//Executes on /cattegory/updatenumberofbooks (PUT)
	changeNumOfBooks(subcatid, newnumofbooks){
		console.log(`put: update of number of books of subcatecory id ${subcatid} category`);
		let foundCategory= false;
		for(let i in data.categories){

			for(let j in data.categories[i].subcategories){

				//Variable for name comparaision
				var CatFound  = data.categories[i].subcategories[j].id;
				
				//Runs on each status and numberofbooks and compares
				if(CatFound == subcatid) {
					foundCategory = true;

					//It doesnt really update the json file its only a reference to the file
					//Its just for usage example of put request
					data.categories[i].subcategories[i].numberofbooks = newnumofbooks;
					return `The ${subcatid} subcategory's number of books was updated to newnumofbooks`;
				}
			}
		
		}
		if(!foundCategory){
			var notfound = `There are not subcategories with id ${subcatid}`;
			return notfound;
			}
		}
}	
	




var x = new Functionality();

module.exports = x;