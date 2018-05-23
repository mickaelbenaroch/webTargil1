var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines the sub-schema
var subcategorySchema = Schema({
  id: Number,
  subject: String,
  status: String,
  numberofbooks: Number,
});
//Creates the sub-schema
var Subcategory = mongoose.model('Subcategory', subcategorySchema);

//Defines the main schema
var categorySchema = Schema({
  _id: Schema.Types.ObjectId,
  categoryname: String,
  categoryid: Number,
  subcategories: [subcategorySchema]
});

//Creates the main schema
var Category = mongoose.model('Category', categorySchema);

//Exports the Models, Mongoose now knows how is the structure of the data in mlab
module.exports = Category;

