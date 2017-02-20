var Http     = require("http");
var Allocine = require('allocine-api');
var Parser   = require('./Utils/parsing.js');
var Server   = Http.createServer(function(request, response) {

  function insertData(db,data)
  {
    // db.Insert(result);
  }

  function processFilmData(film)
  {
    var result;
    Allocine.api('search', {q: film, filter: 'movie'}, function(error, results) {
      if(error) { console.log('Error : '+ error); return; }

      result = results.feed;
      var parsed = Parser.parseResult(result);
      insertData('db1',result)
      insertData('db2', parsed);

    return parsed;

    });
  }

  processFilmData('star wars');

});

Server.listen(8080);
console.log("Server is listening");
