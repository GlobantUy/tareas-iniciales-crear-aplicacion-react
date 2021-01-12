const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  amount: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  payments: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: false
  },
  _id: {
    type: String,
    required: true
  },
  stateDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Table', tableSchema)
