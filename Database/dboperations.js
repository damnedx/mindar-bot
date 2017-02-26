var mongoose = require ("mongoose");

var url = "mongodb://localhost/Mindar-dev";
var info_console = "[DATABASE]";
mongoose.Promise = global.Promise;
// connect to database (single instance for all the app)
function dboperations() {
  mongoose.connect(url, function (err, res) {
    if (err) {
      console.log (info_console + 'ERROR connecting to: ' + url + '. ' + err);
    } else {
      console.log (info_console + 'Succeeded connected to: ' + url);
    }
  });

}

dboperations.prototype.insertMovie = function(movie) {
    movie.save(function (err) {
      if (err)
        console.log (info_console + 'Error insert : ' + err)
      else {
        console.log(info_console + 'Inserted movie : ' + movie);
      }
    });
}

module.exports = dboperations;
