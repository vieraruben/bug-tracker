const mongoose = require('mongoose')
const Ticket = require('../models/project.model')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  updatedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Project', ProjectSchema)