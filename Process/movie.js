var info_console   = "[MOVIE] ";
var Allocine       = require('allocine-api');
var Fs             = require('fs');
var Request        = require('request');
var Slug           = require('slug');
var Parser         = require('../Utils/parsing.js');
var Search         = require('../Utils/search.js');
var DBOperations   = require('../Database/dboperations.js');
var MovieModel     = require('../Database/Schemas/movieSchema.js');


const collectionProd     = "Movies";
const collectionArchive  = "MoviesArchive";
const actorsPath = "./data/actors/";

var flickr = require('flickr-client')({
  key: '6b0d396b148f0c1ba87b84e2e7fc1526',
});

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
            return;
          }
        });

        DBOperations.insertMovie(collectionProd, dataProd);
        DBOperations.insertMovie(collectionArchive, data);

      }).catch(function(e) {
        
      });
    }

    this.downloadActorPicture = function(person) {
      var slug = Slug(person.code + '-' + person.name);
      var $this = this;
      if (person.href == null) {
        console.error(info_console + 'person.href == null')
      } else if (person.name == null) {
        console.error(info_console + 'person.name == null');
      } else if (person.code == null) {
        console.error(info_console + 'person.code == null');
      } else {
        var path = actorsPath + slug;
        Fs.stat(actorsPath + slug, function (err, stats){
          if (err) {
            Fs.mkdir(actorsPath + slug, function(mkdirError) {
              $this.downloadPicture(person.href, actorsPath+slug, 'jpg');
                  flickr('photos.search', { text:person.name,sort: 'relevance', extras:'url_o' }, function (error, response) {
                  console.log(info_console+' Getting from FLICKR ' + person.name);
                  response.photos.photo.forEach(obj => {
                    var urlo = obj.url_o;
                    if (urlo) {
                      for (var i = urlo.length; urlo[i] != '.'; i--) 
                      {}
                      var extension = urlo.substring(i+1);
                      $this.downloadPicture(urlo, actorsPath+slug, extension);
                    }
                  });
                });
            });
          } else {
            console.error(info_console + slug + " picture already in database");
          }
        });
      }
    }

    this.downloadPicture = function(href, folderName, fileType) {
      var $this = this;
      Request.get({url: href, encoding: 'binary'}, function (err, response, body) {
        var fileName = $this.nbDirectoryFiles(folderName) + '.' + fileType;
        console.log(info_console+'fileName ' + fileName+'; href' + href);
        Fs.writeFile(folderName + "/" + fileName, body, 'binary', function(err) {
          if(err)
            console.error(info_console + err);
          else
            console.log(info_console + "Picture " + folderName + " was saved");
        });
      });
    }


    this.nbDirectoryFiles = function (path) {
      var result = 0;
      Fs.readdir(".", (err, files) => {
        if (files == undefined) {
          return result;
        }
        files.forEach(file => {
          result++;
        });
      })

      return result;
    } 

	return this;
}

module.exports = new movie();
