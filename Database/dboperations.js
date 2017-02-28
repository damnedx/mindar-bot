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
        insert: function(database, data){
          mongodb.collection(database).insert(data, null, function (error, results) {
            if (error){
              console.error(info_console + "couldn't insert data in : " + database + ", " + error );
            }
            else
              console.log(info_console + "doccument added successfully");
          });

        },
        close: function() {
            mongodb.close();
        }
    };
})();
