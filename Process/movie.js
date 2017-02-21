var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');

var movie = function() {

    this.index = function (name) {
        var promise = new Promise(
            function(resolve, reject) {
                 Allocine.api('search', {q: name, filter: 'movie'}, function(error, results) {
                  if(error) { console.log('Error : '+ error); return; }
                    resolve(Parser.parseMovie(results.feed));
                });
            }
           
        );

        return promise;
    }

    this.store = function (name) {

    }

	return this;
}

module.exports = new movie();
