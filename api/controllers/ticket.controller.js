const Ticket = require('../models/project.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const config = require('../../config/config')

const create = async (req, res) => {
  const project = new Ticket(req.body)
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
  return res.json(req.ticket)
}

/**
 * Load ticket and append to req.
 */
const projectByID = async (req, res, next, id) => {
  try {
    let project = await Ticket.findById(id)
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
    let project = req.project
    project = extend(project, req.body)
    project.updated = Date.now()
    await project.save()
    res.json(project)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let project = req.project
    let deletedProject = await project.remove()
    res.json(deletedProject)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  read,
  create,
  projectByID,
  remove,
  update
}