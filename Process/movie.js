var info_console   = "[MOVIE] ";
var Allocine       = require('allocine-api');
var Parser         = require('../Utils/parsing.js');
var Search         = require('../Utils/search.js');
var mongoose       = require ("mongoose");
var DBOperations   = require('../Database/dboperations.js');
var MovieModel     = require('../Database/Schemas/movieSchema.js');

var collectionProd     = "Movies";
var collectionArchive  = "MoviesArchive";

var movie = function() {

    this.store = function (name) {
      Search.searchData('movie', name).then(res => {
        res.movie.forEach(movie => {
          DBOperations.exists(collectionProd, {code: movie.code}).then( (cnt) => {
            if (cnt == 0) {
              this.insert(movie.code)
            } else {
              console.error(info_console + " code : " + movie.code + " already in database. Skip inserting");
            }
          });
        });
      }).catch(function(e) {
        console.error(info_console +  'Promise error ' + e);
      });
    }

    this.insert = function(movieCode) {
      Search.getMovie(movieCode, "person").then(res => {
        var data = JSON.stringify(res.movie);
        data = data.replace(/"\$":/g, '"type":');
        data = JSON.parse(data);
        
        var dataProd = {
            code           : data.code,
            movieType      : data.movieType,
            originalTitle  : data.originalTitle,
            title          : data.title,
            keywords       : data.keywords,
            productionYear : data.productionYear,
            castMember     : data.castMember,
        };


        DBOperations.insertMovie(collectionProd, dataProd);
        DBOperations.insertMovie(collectionArchive, data);

      }).catch(function(e) {
        
      });
    }

    // var getAllMoviesFromCodes = function(movieCodes){
    //   var MovieModel = new Array();
    //   var counter = 0;
    //   var promiseArray = new Array();
    //   for (var i = 0; i < movieCodes.length; i++) {
    //     promiseArray.push(Search.getMovie(movieCodes[i], "person"));
    //   }
    //   Promise.all(promiseArray).then(movie => {
    //     var data = JSON.stringify(movie);
    //     data = data.replace(/"\$":/g, '"type":');
    //     DBOperations.insert(collection, JSON.parse(data));
    //   });
    // }

	return this;
}

module.exports = new movie();
