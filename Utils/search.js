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

        return recursiveVariableSearch(data[needle], vars.slice(1));
    }

    // Seeks a data in a "tree" object
    // Ex: bpm.data(usecase, 'feed.movie', 'no')
    this.getData (data, search, notFoundValue) {
        var tree  = search.split('.');
        var found = recursiveVariableSearch(data, tree);

        if (found == undefined) {
            return notFoundValue;
        }

        return found;
    }
}