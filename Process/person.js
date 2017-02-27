var info_console = "[PERSON] ";
var Allocine     = require('allocine-api');
var Parser       = require('../Utils/parsing.js');
var Search       = require('../Utils/search.js');

var person = function() {

    this.index = function (name) {
        var promise = new Promise(
            function(resolve, reject) {
                resolve(Search.searchData('person', name));
            }
        );
        return promise;
    }

    this.store = function (name) {
        
    }


	return this;
}

module.exports = new person();
