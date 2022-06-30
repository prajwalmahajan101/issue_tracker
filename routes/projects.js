
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
router.get('/filter/:id',projectController.filterGet)

//post
router.post('/create',projectController.create)
router.post('/filter_issues',projectController.filterPost)





// Export  Router
module.exports = router