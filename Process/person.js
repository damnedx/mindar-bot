var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');
var person = function() {

	this.index = function (name) {
		var promise = new Promise(
            function(resolve, reject) {
                 Allocine.api('search', {q: name, filter: 'person'}, function(error, results) {
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

module.exports = new person();
