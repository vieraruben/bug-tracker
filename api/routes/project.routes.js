const express = require('express')
const userCtrl = require('../controllers/user.controller')
const projectCtrl = require('../controllers/project.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/projects/by/:userId')
  .get(authCtrl.requireSignin, projectCtrl.listByUser)

router.route('/api/projects/:projectId')
  .get(authCtrl.requireSignin, projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.remove)

router.route('/api/projects')
  .post(authCtrl.requireSignin, projectCtrl.create)

router.param('userId', userCtrl.userByID)
router.param('projectId', projectCtrl.projectByID)

module.exports = router