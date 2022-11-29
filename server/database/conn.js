const {MongoClient} = require("mongodb");
const Database = process.env.ATLAS_URI;

const client = new MongoClient(Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
    connectToServer: function(callback){
        client.connect(function (err, db){
            //verify db object
            if(db){
                _db = db.db("WanderMissionDatabase");

                console.log("Connected to MongoDB");
            }

            return callback(err);
        });
    },

    getDb: function(){
        return _db;
    },
};