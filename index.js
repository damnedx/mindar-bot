var Http           = require('http');
var Url            = require('url');
var Allocine       = require('allocine-api');
var Parser         = require('./Utils/parsing.js');
var Movie          = require('./Process/movie.js');
var Person         = require('./Process/person.js');
var DBOperations   = require('./Database/dboperations.js');

var Server = Http.createServer();

Server.on('request', (request, response) => {
  response.writeHead(200);
  response.write('This is Mindar\n');

  var query = Url.parse(request.url, true).query;

  if (query.movie === undefined && query.person === undefined) {
    response.write('You should give movie or person');
  } else {
    if (query.movie) {
      response.write("You're looking for the movie : " + query.movie);

      var result = Movie.index(query.movie).then(res => {
        console.log(res);
      }).catch(function(e) {
        console.error('Promise error ' + e);
      });

    } else {
      response.write("You're looking for the person : " + query.person);
      var result = Person.index(query.person).then(res => {
        console.log(res);
      }).catch(function(e) {
        console.error('Promise error ' + e);
      });
    }
  }

  response.end();
});

Server.listen(8080);
console.log("Server is listening");
