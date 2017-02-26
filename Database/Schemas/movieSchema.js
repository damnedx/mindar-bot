var mongoose = require ("mongoose");

var movieSchema = function() {
  this.movieSchema = new mongoose.Schema({
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

   return this;
}
module.exports = movieSchema;
