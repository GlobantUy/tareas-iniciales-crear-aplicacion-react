const MongoClient = require('mongodb').MongoClient
const User = require('../api/models/user');
require("dotenv").config();

const connectToDatabase = async () => {

  const database = await MongoClient.connect(process.env.MONGODB_URL, 
    {
      useNewUrlParser: true,
      native_parser: true,
      useUnifiedTopology: true
    }).then((client) => {
      const dbdata = client.db('database');
      return Promise.resolve(dbdata);
    }).catch((error) => {
      return Promise.reject(error);
    });
  const adminColl = database.collection('users');
  const userAdmin = await adminColl.findOne(
    { 
      email: 'admin@test.com'
    }).then((results) => {
        return results;
    }).catch((error) => {
        return error;
    });
  if (!userAdmin) {
    console.log('creando usuario Admin');
    const userN = new User({
      name: 'Admin',
      lName: 'Admin',
      dateOfBirth: Date.now(),
      email: 'admin@test.com',
      department: 'Montevideo',
      gender: 'M',
      preferences: [],
      userName: 'Admin' + ' ' + 'Admin',
      passwd: 12345678,
      userType: 'ADMIN',
      _id: 'admin@test.com'
    })
    adminColl.insertOne(userN); 
  }
  return database;
};

module.exports = connectToDatabase;
