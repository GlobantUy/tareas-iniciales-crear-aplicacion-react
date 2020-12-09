const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
