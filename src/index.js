const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const swaggerDoc = require('./swaggerDoc')

// Logging
const accessLogStream = fs.createWriteStream(path.join('./src/log', 'access.log'), { flags: 'a' })

app.use(morgan('short', { stream: accessLogStream }))

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
swaggerDoc(app)

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
    next()
})

// Routes
const UserRouter = require('./routes/user')
const NasRouter = require('./routes/nas')

app.use(UserRouter)
app.use(NasRouter)

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})