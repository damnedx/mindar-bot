var http = require("http");
var allocine = require('allocine-api');

var server = http.createServer(function(request, response) {

  function parseResult(data)
  {
    console.log('parseResult');
    console.log(data);
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
    });

    var parsed;
    setTimeout(test, 1000);
    function test() {
      parsed = parseResult(result);
      insertData('db1',result)
      insertData('db2', parsed);
    }
    return parsed;

  }

  processFilmData('spiderman');

});

server.listen(8080);
console.log("Server is listening");