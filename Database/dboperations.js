var Search         = require('../Utils/search.js');

(function(){
    var client = require('mongodb').MongoClient,
        mongodb;

    var url = "mongodb://localhost/Mindar-dev";
    var info_console = "[DATABASE] ";
    module.exports =  {
        connect: function(callback) {
            client.connect(url, function(err, db){
                if(err){
                  console.error(info_console + 'couldnt connect to : ' + url);
                }
                else{
                  mongodb = db;
                  console.log(info_console + 'connected to : ' + url);
                  if(callback) {
                     callback();
                   }
                }
            });
        },
        db: function() {
            return mongodb;
        },
        insertMovie: function(database, data){
          mongodb.collection(database).insert(data, null, function (error, results) {
            if (error){
              console.error(info_console + "couldn't insert data in : " + database + ", " + error );
            }
            else
              console.log(info_console + "document : " + Search.getObjectData(data, "title", "--")  + " added  in : " + database);
          });

        },
        // To be called like this : exists().then(...)
        exists: function(database, criteria) {
            return mongodb.collection(database).find(criteria).limit(1).count();
        },
        close: function() {
            mongodb.close();
        }
    };
})();
