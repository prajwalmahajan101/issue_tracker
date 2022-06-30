
// Node Modules
const express = require('express')


// Project Modules
// --> Passport Authentication

//Controllers
const homeController = require('../controllers/home_controller')

//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/',homeController.home)
router.use('/projects', require('./projects'))
router.use('/issues', require('./issues'))
router.use('/',homeController.pageNotFound)

// Export  Router
module.exports = router