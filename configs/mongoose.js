const mongoose = require('mongoose')
const env = require('../env')

const DBUrl  = env.DBUrl || 'mongodb://localhost:27017'

mongoose.connect(DBUrl)

const Db = mongoose.connection;

Db.on('error',console.error.bind(console,"Error connect to MongoDb"))

Db.once('open',()=>{
    console.log("Connected To DataBase :: MongoDb")
})

module.exports = Db