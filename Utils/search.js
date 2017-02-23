var Allocine       = require('allocine-api');

var search = function() {
	this.recursiveVariableSearch = function (data, vars) {
        // Catching PHP flavor :-°
        if (data == null) {
            data = undefined;
        }

        if (data == undefined || vars.length == 0) {
            return data;
        }


        var needle = vars[0];

        return this.recursiveVariableSearch(data[needle], vars.slice(1));
    }

    // Seeks a data in a "tree" object
    // Ex: getObjectdata(usecase, 'feed.movie', 'no')
    this.getObjectData = function (data, search, notFoundValue) {
        var tree  = search.split('.');
        var found = this.recursiveVariableSearch(data, tree);

        if (found == undefined) {
            return notFoundValue;
        }

        return found;
    }

    this.getData = function(type, name) {
        var promise = new Promise(
            function(resolve, reject) {
                 Allocine.api('search', {q: name, filter: type}, function(error, results) {
                  if(error) { console.log('Error : '+ error); return; }
                    resolve(results.feed);
                });
            }
           
        );

        return promise;
    }

	return this;
}

module.exports = new search();
