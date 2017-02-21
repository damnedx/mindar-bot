var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');
var $        = require("jquery");
var movie = function() {

    this.index = function (name) {
        var deferred = $.Deferred();
        
        Allocine.api('search', {q: name, filter: 'movie'}, function(error, results) {
          if(error) { console.log('Error : '+ error); return; }
            deferred.resolve(Parser.parseMovie(results.feed));

        });

        return deferred.promise();
    }

    this.store = function (name) {

    }

	return this;
}

module.exports = new movie();
