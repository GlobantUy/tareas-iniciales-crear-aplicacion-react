const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  passwd: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  preferences: {
    type: Array,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  _id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
