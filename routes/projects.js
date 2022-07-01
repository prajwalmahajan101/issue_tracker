
// Node Modules
const express = require('express')


// Project Modules
// --> Passport Authentication

//Controllers
const projectController = require('../controllers/project_controller')

//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/:id',projectController.detail)

//post
router.post('/create',projectController.create)
router.post('/filter_issues',projectController.filter)





// Export  Router
module.exports = router