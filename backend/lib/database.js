const MongoClient = require('mongodb').MongoClient
require("dotenv").config();

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
      useNewUrlParser: true,
      native_parser: true,
      useUnifiedTopology: true
    }).then((client) => {
      const db = client.db('database')
      //const collection = 
      db.collection('users');
      //const loans = 
      db.collection('loans');
    // Query for a movie that has the title 'Back to the Future'
    //const query = { title: 'Back to the Future' };
    //const movie = await collection.findOne(query);

      console.log('New connection created')
      return Promise.resolve(db);
    }).catch((error) => {
      return Promise.reject(error);
    });
  isConnected = database;
  return database;
};

module.exports = connectToDatabase;
