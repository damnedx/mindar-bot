var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');
var person = function() {

	this.index = function (name) {
		Allocine.api('search', {q: name, filter: 'person'}, function(error, results) {
          if(error) { console.log('Error : '+ error); return; }

          // console.log(results);

        return Parser.parsePerson(results);

        });
    }

    this.store = function (name) {
        
    }


	return this;
}

module.exports = new person();
