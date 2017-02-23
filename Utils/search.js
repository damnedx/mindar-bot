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

		return this;
}

module.exports = new search();
