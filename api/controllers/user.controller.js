const User = require('../models/user.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const config = require('../../config/config')

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    let newuser = await user.save()
    return res.status(200).json({
      message: "Successfully signed up!",
      user: newuser
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const test = (req, res) => {
  return res.status(200).json({
    message: "Testing User Ruben"
  })
}

const allUsers = async (req, res) => {
  try {
    let users = await User.find()
      .exec()
    res.status(200).json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    // Remove user
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  allUsers,
  test,
  create,
  userByID,
  read,
  remove,
  update
}