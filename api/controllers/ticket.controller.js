const Ticket = require('../models/ticket.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const config = require('../../config/config')

const create = async (req, res) => {
  const ticket = new Ticket(req.body)
  try {
    await ticket.save()
    return res.status(200).json({
      message: "Ticket created!"
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
const ticketByID = async (req, res, next, id) => {
  try {
    let ticket = await Ticket.findById(id)
    if (!ticket)
      return res.status('400').json({
        error: "Ticket not found"
      })
    req.ticket = ticket
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve ticket"
    })
  }
}

const listByProject = async (req, res) => {
  try {
    let tickets = await Ticket.find({ project: req.params.projectId })
      .populate('createdBy', '_id name')
      .populate('project', '_id name')
      .exec()
    res.json(tickets)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
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

const comment = async (req, res) => {
  let comment = req.body
  try{
    let result = await Ticket.findByIdAndUpdate(req.params.ticketId, {$push: {comments: comment}}, {new: true})
                            .populate('comments.createdBy', '_id name')
                            .populate('createdBy', '_id name')
                            .exec()
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const uncomment = async (req, res) => {
  try{
    let result = await Ticket.findByIdAndUpdate(req.params.ticketId, {$pull: {comments: {_id: req.params.commentId}}}, {new: true})
                          .populate('comments.createdBy', '_id name')
                          .populate('createdBy', '_id name')
                          .exec()
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  comment,
  uncomment,
  listByProject,
  read,
  create,
  ticketByID,
  remove,
  update
}