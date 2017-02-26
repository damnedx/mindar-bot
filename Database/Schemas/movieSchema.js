var mongoose = require ("mongoose");

var movieSchema = new mongoose.Schema({
   title: {
     originaleTitle: String,
     usualTitle: String,
     code: Number
   },
   actors: {
     code: Number,
     name: String
   }
 });
