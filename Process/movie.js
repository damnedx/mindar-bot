var info_console   = "[MOVIE] ";
var Allocine       = require('allocine-api');
var Parser         = require('../Utils/parsing.js');
var Search         = require('../Utils/search.js');
var mongoose       = require ("mongoose");
var DBOperations   = require('../Database/dboperations.js');
var MovieModel     = require('../Database/Schemas/movieSchema.js');

var movie = function() {

    this.index = function (name) {
      Search.searchData('movie', name).then(res => {

        var allMovies = res.movie;
        var movieCodes = new Array();

        for (var i = 0; i < res.movie.length; i++) {
            movieCodes.push(res.movie[i].code);
        }
        movieCodes = Parser.uniqueArray(movieCodes);
        getAllMoviesFromCodes(movieCodes);
      }).catch(function(e) {
        console.error(info_console +  'Promise error ' + e);
      });

    }

    var getAllMoviesFromCodes = function(movieCodes){
      var MovieModel = new Array();
      for (var i = 0; i < movieCodes.length; i++) {
        Search.getMovie(movieCodes[i], "person").then(movie => {
          MovieModel.push(movie);
        }).catch(function(e) {
          console.error(info_console +  'Promise error ' + e);
        });
      }
    }

    this.store = function (movie, database) {
      /*
      this.index(name).then(res => {
          var movieCodes = new Array();
          for (var i = 0; i < res.movie.length; i++) {
              movieCodes.push(res.movie[i].code);
          }

          movieCodes = Parser.uniqueArray(movieCodes);
          for (var i = 0; i < movieCodes.length; i++) {
            Search.getMovie(movieCodes[i], "person").then(people => {
              // console.log(people);
            })
          }

        }).catch(function(e) {
          console.error(info_console+'Promise error ' + e);
        });*/

    }

	return this;
}

module.exports = new movie();
