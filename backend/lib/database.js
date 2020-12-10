const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

let cachedDb = null;

export const connectToDatabase = async => {
    if (cachedDb) {
        console.log("Use previous connection");
        return Promise.resolve(cachedDb);
    } else {
        return MongoClient.connect('mongodb+srv://test1:123@cluster0.e2axf.mongodb.net/database?retryWrites=true&w=majority', {
            native_parser: true,
            useUnifiedTopology: true
        })
            .then((client) => {
                let db = client.db("database");
                console.log("New connection created");
                cachedDb = db;
                return cachedDb
            }).catch((error) => {
                console.log("DB connection error");
                console.log(error);
            })
    }
}