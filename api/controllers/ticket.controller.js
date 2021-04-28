const Ticket = require('../models/ticket.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const config = require('../../config/config')
const fs = require('fs')

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
                             .populate('comments.createdBy', '_id name')
                             .populate('attachments.createdBy', '_id name')
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
      .populate('comments.createdBy', '_id name')
      .populate('attachments.createdBy', '_id name')
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
  try {
    let result = await Ticket.findByIdAndUpdate(req.params.ticketId, { $push: { comments: comment } }, { new: true })
      .populate('comments.createdBy', '_id name')
      .populate('createdBy', '_id name')
      .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const uncomment = async (req, res) => {
  try {
    let result = await Ticket.findByIdAndUpdate(req.params.ticketId, { $pull: { comments: { _id: req.params.commentId } } }, { new: true })
      .populate('comments.createdBy', '_id name')
      .populate('createdBy', '_id name')
      .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const upload = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "attachment") to retrieve the uploaded file
      let attachment = req.files.attachment;

      //Use the mv() method to place the file in upload directory (i.e. "attachments")
      attachment.mv(`./attachments/${req.params.userId}/${attachment.name}`);

      let newAttachment = req.body
      newAttachment.name = attachment.name
      newAttachment.size = attachment.size
      newAttachment.url = req.params.userId + '/' + attachment.name

      await Ticket.findByIdAndUpdate(req.params.ticketId, { $push: { attachments: newAttachment } }, { new: true })
        .populate('attachments.createdBy', '_id name')
        .populate('createdBy', '_id name')
        .exec()

      res.send({
        status: true,
        message: 'File uploaded',
        data: {
          name: attachment.name,
          mimetype: attachment.mimetype,
          size: attachment.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

const deleteFile = async (req, res) => {
  try {
    await fs.unlinkSync(`./attachments/${req.params.userId}/${req.params.fileName}`);
    await Ticket.findByIdAndUpdate(req.params.ticketId, { $pull: { attachments: { name: req.params.fileName } } }, { new: true })
      .populate('comments.createdBy', '_id name')
      .populate('createdBy', '_id name')
      .exec()
    return res.status(200).json({
      message: `File '${req.params.fileName}' has been deleted!`
    })
  } catch (err) {
    return res.status(200).json({
      err: err
    })
  }
}

module.exports = {
  deleteFile,
  remove,
  upload,
  comment,
  uncomment,
  listByProject,
  read,
  create,
  ticketByID,
  remove,
  update
}