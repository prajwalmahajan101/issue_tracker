
// Node Modules
const express = require('express')


// Project Modules
// --> Passport Authentication

//Controllers
const issueController = require('../controllers/issue_controller')

//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/:id',issueController.detail)


//post
router.post('/create',issueController.create)
// router.post('/create2',issueController.test)

// Export  Router
module.exports = router