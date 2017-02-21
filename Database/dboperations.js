var mongo = require('mongodb');

function dboperations(url) {
    this.url = url;
}

dboperations.prototype.insert = function() {
    console.log('insert is here '+ this.url);
}

module.exports = dboperations;
