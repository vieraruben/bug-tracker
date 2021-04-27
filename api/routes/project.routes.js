const express = require('express')
const userCtrl = require('../controllers/user.controller')
const projectCtrl = require('../controllers/project.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/projects')
  .post(projectCtrl.create)

router.route('/api/users') // remove later
  .get(projectCtrl.test)

router.route('/api/projects/:userId')
  .get(authCtrl.requireSignin, projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports = router