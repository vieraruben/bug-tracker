const express = require('express')
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/users')
  .post(userCtrl.create)

router.route('/api/users/test') // for testing
  .get(userCtrl.test)

router.route('/api/users')
  .get(userCtrl.allUsers)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, userCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports = router