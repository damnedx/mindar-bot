var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');
var Search   = require('../Utils/search.js');

var movie = function() {

    this.index = function (name) {
        var promise = new Promise(
            function(resolve, reject) {
                Search.getData('movie', name).then(res => {
                    resolve(res);
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
