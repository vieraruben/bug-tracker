const Project = require('../models/project.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const config = require('../../config/config')

const create = async (req, res) => {
  const project = new Project(req.body)
  try {
    await project.save()
    return res.status(200).json({
      message: "Project created!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = (req, res) => {
  return res.json(req.project)
}

/**
 * Load project and append to req.
 */
const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id)
    if (!project)
      return res.status('400').json({
        error: "Project not found"
      })
    req.project = project
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve project"
    })
  }
}

const update = async (req, res) => {
  try {
    let ticket = req.ticket
    ticket = extend(ticket, req.body)
    ticket.updated = Date.now()
    await ticket.save()
    res.json(ticket)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try {
    let projects = await Project.find({ createdBy: req.profile._id })
      .populate('createdBy', '_id name')
      .exec()
    res.json(projects)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let ticket = req.ticket
    let deletedTicket = await ticket.remove()
    res.json(deletedTicket)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  listByUser,
  read,
  create,
  projectByID,
  remove,
  update
}