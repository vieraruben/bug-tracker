const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  }
})

module.exports = mongoose.model('Ticket', TicketSchema)