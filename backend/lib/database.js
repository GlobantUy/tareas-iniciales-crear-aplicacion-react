const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let cachedDb = null

// export 
const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('Use previous connection')
    return Promise.resolve(cachedDb)
  } else {
    return MongoClient.connect(process.env.DATABASE_URL, {
      native_parser: true,
      useUnifiedTopology: true
    })
      .then((client) => {
        const db = client.db('database')
        console.log('New connection created')
        cachedDb = db
        return cachedDb
      }).catch((error) => {
        console.log('DB connection error')
        console.log(error)
      })
  }
}
module.exports = connectToDatabase;