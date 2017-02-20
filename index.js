var http     = require("http");
var allocine = require('allocine-api');
var search   = require('./Utils/search.js');

var server = http.createServer(function(request, response) {

  function parseResult(elements)
  {
    console.log('parseResult');
    var parsed;
    elements.movie.forEach(movie => {
      console.log(movie);
      // var json = {
      //   originalTitle: movie.originalTitle,
      //   title        : movie.title,
      //   releaseDate  : search.getData(movie, "release.releaseDate");
      // }
    });
    // var movie = search.getData(elements, 'movie');

    // return jsonObject({Films : data->films, Actors : data->castingShorts});
  }

  function insertData(db,data)
  {
    // db.Insert(result);
  }


  function processFilmData(film)
  {
    var result;
    allocine.api('search', {q: film, filter: 'movie'}, function(error, results) {
      if(error) { console.log('Error : '+ error); return; }
      
      result = results.feed;

      var parsed;
      parsed = parseResult(result);
      insertData('db1',result)
      insertData('db2', parsed);

    return parsed;

    });
  }

  processFilmData('star wars');

});

server.listen(8080);
console.log("Server is listening");