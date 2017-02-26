var mongoose = require ("mongoose");

var url = "mongodb://localhost/Mindar-dev";
mongoose.Promise = global.Promise;
// connect to database (single instance for all the app)
function dboperations() {
  mongoose.connect(url, function (err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + url + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + url);
    }
  });

}

dboperations.prototype.insertMovie = function(movie) {
    movie.save(function (err) {
      if (err)
        console.log ('Error insert : ' + err)
      else {
        console.log('Inserted movie : ' + movie);
      }
    });
}

module.exports = dboperations;
