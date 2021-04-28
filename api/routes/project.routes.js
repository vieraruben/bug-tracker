const express = require('express')
const userCtrl = require('../controllers/user.controller')
const projectCtrl = require('../controllers/project.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/projects/:userId')
  .get(authCtrl.requireSignin, projectCtrl.read)
  .post(authCtrl.requireSignin, projectCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('projectId', projectCtrl.projectByID)

module.exports = router