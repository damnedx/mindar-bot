var http = require("http");
var allocine = require('allocine-api');

var server = http.createServer(function(request, response) {

    var recursiveVariableSearch = function (data, vars) {
        // Catching PHP flavor :-°
        if (data == null) {
            data = undefined;
        }

        if (data == undefined || vars.length == 0) {
            return data;
        }

        var needle = vars[0];

        return recursiveVariableSearch(data[needle], vars.slice(1));
    }

    // Seeks a data in a "tree" object
    // Ex: bpm.data(usecase, 'feed.movie', 'no')
    data = function (data, search, notFoundValue) {
        var tree  = search.split('.');
        var found = recursiveVariableSearch(data, tree);

        if (found == undefined) {
            return notFoundValue;
        }

        return found;
    }

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