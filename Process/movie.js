var info_console   = "[MOVIE] ";
var Allocine       = require('allocine-api');
var Fs             = require('fs');
var Request        = require('request');
var Slug           = require('slug');
var Parser         = require('../Utils/parsing.js');
var Search         = require('../Utils/search.js');
var mongoose       = require ("mongoose");
var DBOperations   = require('../Database/dboperations.js');
var MovieModel     = require('../Database/Schemas/movieSchema.js');

var collectionProd     = "Movies";
var collectionArchive  = "MoviesArchive";

var actorsPath = "data/actors/";

var movie = function() {

    this.store = function (name) {
      Search.searchData('movie', name).then(res => {
        res.movie.forEach(movie => {
          DBOperations.exists(collectionProd, {code: movie.code}).then( (cnt) => {
            if (cnt == 0) {
              this.insert(movie.code);
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

        dataProd.castMember.forEach(element => {
          var activity = Search.getObjectData(element, "activity.type",null)
          if (Slug(activity) == "Acteur" || Slug(activity) == "Actrice") {
            var person = {
              code : Search.getObjectData(element, "person.code", null),
              name : Search.getObjectData(element, "person.name", null),
              href : Search.getObjectData(element, "picture.href", null),
            };
            this.downloadActorPicture(person);
          }
        });

        DBOperations.insertMovie(collectionProd, dataProd);
        DBOperations.insertMovie(collectionArchive, data);

      }).catch(function(e) {
        
      });
    }

    this.downloadActorPicture = function(person) {
      var slug = Slug(person.code + '-' + person.name);
      if (person.href == null || person.name == null || person.code == null) {
        console.error(info_console + "can't save person");
      } else {
        var path = actorsPath + slug;
        Fs.stat(actorsPath + slug, function (err, stats){
          if (err) {
            Fs.mkdir(actorsPath + slug, function(mkdirError) {
              Request.get({url: person.href, encoding: 'binary'}, function (err, response, body) {
                Fs.writeFile(actorsPath, body, 'binary', function(err) {
                  if(err)
                    console.error(info_console + err);
                  else
                    console.log(info_console + "Picture " + slug + " was saved");
                }); 
              });
            });
          } else {
            console.error(info_console + slug + " picture already in database");
          }
        });
      }
    }

	return this;
}

module.exports = new movie();
