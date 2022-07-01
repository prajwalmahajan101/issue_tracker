// env
// const env = require('./env')
//Node Module
const express = require('express')
const bodyParser = require('body-parser')
const expressLayout = require('express-ejs-layouts')
// Variable
const app = express()
const port = process.env.PORT || 8080
// Project module
const db = require('./configs/mongoose')

//Request Body Parser
app.use(bodyParser.urlencoded({extended:false}))

// Static Folder
app.use(express.static('./assets'))

// View Engine
app.set("view engine","ejs")
// Views Folder Location
app.set("views","./views")

// Layout Middleware
//set Layout
app.use(expressLayout)
//extract link ans script
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)






app.use('/',require('./routes/index'))

app.listen(port,(err)=>{
    if(err) console.log(`error on running the server on port : ${port}`)
    else console.log(`Server is running on port: ${port}`)
})

