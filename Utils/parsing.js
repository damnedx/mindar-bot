var Search   = require('./search.js');
var parsing  = function() {

  this.parseMovie = function (elements){
    var result = array();

    elements.movie.forEach(movie => {
       var movieRes = {
        title: {
          originalTitle : movie.originalTitle,
          usualTitle    : movie.title,
          code          : movie.code,
        },
        actors: {names: movie.castingShort.actors}
       };
       
       result.push(movieRes);
    });

    return result;
  }

  this.parsePerson = function (elements) {
    return elements;
  }

  this.uniqueArray = function(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
  }

  return this;

}
module.exports = new parsing();
