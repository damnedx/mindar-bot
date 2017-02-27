var info_console   = "[SEARCH] ";
var Allocine       = require('allocine-api');

var search = function() {
    var $this = this;

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


    this.fetch = function(type, params) {
        var promise = new Promise(
            function(resolve, reject) {
                 Allocine.api(type, params, function(error, results) {
                  if(error) { console.error(info_console+'Api Error : '+ error); reject(error); return; }
                    resolve(results.feed);
                });
            }
        );

        return promise;
    }

    this.searchData = function(type, name) {
        var promise = new Promise(
            function(resolve, reject) {
                var params = {q:name, filter: type, count: 1}; // to change
                $this.fetch('search', params).then(res => {
                    resolve(res);
                }).catch(function(e) {
                    console.error(info_console+'Promise error ' + e);
                    reject(e);
                });
            }
        );

        return promise;
    }

    this.getMovie = function(code, filter) {
        var promise = new Promise(
            function(resolve, reject) {
                var params = {code:code, filter: filter};
                $this.fetch('movie', params).then(res => {
                    // console.log(res);
                    resolve(res);
                }).catch(function(e) {
                    console.error(info_console+'Promise error ' + e);
                    reject(e);
                });
            }
        );

        return promise;
    }

    this.getPerson = function(code, filter) {
        var promise = new Promise(
            function(resolve, reject) {
                var params = {code:code, filter: filter};
                $this.fetch('person', params).then(res => {
                    resolve(res);
                }).catch(function(e) {
                    console.error(info_console+'Promise error ' + e);
                    reject(e);
                });
            }
        );

        return promise;
    }

	return this;
}

module.exports = new search();
