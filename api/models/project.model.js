const mongoose = require('mongoose')

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
  }
})

module.exports = mongoose.model('Project', ProjectSchema)