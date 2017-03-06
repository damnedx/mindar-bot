var mongoose = require ("mongoose");

var movieSchema = function() {
  this.movieSchema = new mongoose.Schema({
     title: {
       originaleTitle: String,
       usualTitle: String,
       code: Number
     },
     // {
     //   code: Number,
     //   name: String
     // }
     actors: [Schema.Types.Mixed]
   });

   return this;
}
module.exports = movieSchema;
