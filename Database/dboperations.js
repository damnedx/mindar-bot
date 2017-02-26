var mongoose = require ("mongoose");

var url = "mongodb://localhost/Mindar-dev";

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

dboperations.prototype.insert = function() {
    console.log('insert is here '+ this.url);
}

module.exports = dboperations;
