var info_console = "[PERSON] ";
var Allocine     = require('allocine-api');
var Parser       = require('../Utils/parsing.js');
var Search       = require('../Utils/search.js');

var person = function() {

    this.index = function (name) {
        var promise = new Promise(
            function(resolve, reject) {
                Search.searchData('person', name).then(res => {
                    resolve(res);
                }).catch(function(e) {
                    console.error(info_console+'Promise error ' + e);
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
