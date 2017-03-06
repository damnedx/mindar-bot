var info_console = "[PERSON] ";
var Allocine     = require('allocine-api');
var Parser       = require('../Utils/parsing.js');
var Search       = require('../Utils/search.js');

var person = function() {

    this.index = function (name) {
      return Search.searchData('person', name);
    }

    this.store = function (name) {

    }


	return this;
}

module.exports = new person();
