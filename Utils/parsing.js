var Search   = require('./search.js');
var parsing = function() {

  this.parseMovie = function (elements){

    // elements.movie.forEach(movie => {
    //    var item = {
    //      originalTitle: movie.originalTitle,
    //      title        : movie.title,
    //      releaseDate  : Search.getObjectData(movie, "release.releaseDate")
    //    };
    //    console.log(item);
    // });

    return elements;
  }

  this.parsePerson = function (elements) {
    return elements;
  }


  return this;

}
module.exports = new parsing();
