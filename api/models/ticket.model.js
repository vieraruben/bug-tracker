const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  // description: {
  //   type: String,
  //   trim: true,
  //   required: 'Description is required'
  // },
  // state: {
  //   type: String,
  //   trim: true,
  //   required: 'State is required'
  // },
  // priority: {
  //   type: String,
  //   trim: true,
  //   required: 'Priority is required'
  // },
  project: {type: mongoose.Schema.ObjectId, ref: 'Project', required: 'Project is required'},
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  attachments: [{
    name: String,
    description: String,
    url: String,
    created: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Ticket', TicketSchema)