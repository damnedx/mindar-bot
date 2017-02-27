var Allocine = require('allocine-api');
var Parser   = require('../Utils/parsing.js');
var Search   = require('../Utils/search.js');
var mongoose = require ("mongoose");
var MovieModel = require('../Database/Schemas/movieSchema.js');

var movie = function() {

    this.index = function (name) {
        var promise = new Promise(
            function(resolve, reject) {
                Search.getData('movie', name).then(res => {
                    resolve(res);
                }).catch(function(e) {
                    console.error('Promise error ' + e);
                });
            }
        );
        return promise;
    }

    this.store = function (name, database) {
        var database = new DBOperations;
        var result = this.index(query.movie).then(res => {
            console.log(res);
            // Ici parse et store

          }).catch(function(e) {
            console.error('Promise error ' + e);
          });
    }

	return this;
}

module.exports = new movie();
