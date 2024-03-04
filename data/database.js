const dotEnv = require("dotenv");
dotEnv.config();

const mongoClient = require("mongodb").MongoClient;

let database;  // This is the database as a whole

// The next functions is used to connect to the data base.
// It 
const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialised");
    return callback(null, database);
  }
  mongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) { 
    throw Error("Database Not Initailsed");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
