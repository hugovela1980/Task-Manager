const express = require('express')
require('./db/mongoose')
const siteRouter = require('./routers/site')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const groupRouter = require('./routers/group')
const path = require('path')
const hbs = require('hbs')
const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup routers to serve data
app.use(express.json())
app.use(siteRouter)
app.use(userRouter)
app.use(taskRouter)
app.use(groupRouter)

// Setup port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})