var Search   = require('./search.js');
var parsing = function() {

  this.parseResult = function (elements){
    console.log('parseResult');
    elements.movie.forEach(movie => {
       var item = {
         originalTitle: movie.originalTitle,
         title        : movie.title,
         releaseDate  : Search.getData(movie, "release.releaseDate")
       };
       console.log(item);
    });
    return elements;
    // return jsonObject({Films : data->films, Actors : data->castingShorts});
  }
  return this;

}
module.exports = new parsing();
