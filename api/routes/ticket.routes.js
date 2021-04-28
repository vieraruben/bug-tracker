const express = require('express')
const userCtrl = require('../controllers/user.controller')
const ticketCtrl = require('../controllers/ticket.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/projects/:userId')
  .get(authCtrl.requireSignin, ticketCtrl.read)
  .post(authCtrl.requireSignin, ticketCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, ticketCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, ticketCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('ticketId', ticketCtrl.ticketByID)

module.exports = router