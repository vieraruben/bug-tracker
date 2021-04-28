const express = require('express')
const userCtrl = require('../controllers/user.controller')
const ticketCtrl = require('../controllers/ticket.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/tickets/by/:projectId')
  .get(authCtrl.requireSignin, ticketCtrl.listByProject)

router.route('/api/tickets/:ticketId/comment')
  .post(authCtrl.requireSignin, ticketCtrl.comment)

router.route('/api/tickets/:ticketId/uncomment/:commentId')
  .delete(authCtrl.requireSignin, ticketCtrl.uncomment)

router.route('/api/tickets/:ticketId')
  .get(authCtrl.requireSignin, ticketCtrl.read)
  .put(authCtrl.requireSignin, ticketCtrl.update)
  .delete(authCtrl.requireSignin, ticketCtrl.remove)

router.route('/api/tickets')
  .post(authCtrl.requireSignin, ticketCtrl.create)

router.route('/api/:userId/tickets/:ticketId/upload')
  .post(authCtrl.requireSignin, ticketCtrl.upload)

router.route('/api/:userId/tickets/:ticketId/delete/:fileName')
  .delete(authCtrl.requireSignin, ticketCtrl.deleteFile)

router.param('userId', userCtrl.userByID)
router.param('ticketId', ticketCtrl.ticketByID)

module.exports = router