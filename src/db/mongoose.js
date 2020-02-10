const mongoose = require('mongoose')

const uri = 'mongodb://hugovela1980@gmail.com:small421Feathers/tasks-website-api'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: true
})