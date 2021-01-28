// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
require("dotenv").config();
// MongoClient.Promise = global.Promise;

const connectToDatabase = async () => {
  let isConnected;
  if (isConnected) {
    console.log('using existing database connection');
    return Promise.resolve(isConnected);
  }
  /*MongoClient.connect(process.env.DATABASE_URL, {
    native_parser: true,
    useUnifiedTopology: true
  })*/

  console.log('using new database connection');
  const database = await MongoClient.connect(process.env.MONGODB_URL, 
    {
      // native_parser: true,
      // useUnifiedTopology: true
      useNewUrlParser: true
    }).then((client) => {
      const db = client.db('database')
      console.log('New connection created')
      // cachedDb = db
      // isConnected = db;
      return Promise.resolve(db);
    }).catch((error) => {
      console.log('DB connection error')
      console.log(error)
      return Promise.reject(error);
    });
  isConnected = database; // .connections[0].readyState;
  return database;
};

module.exports = connectToDatabase;
