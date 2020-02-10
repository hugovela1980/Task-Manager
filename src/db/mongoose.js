const mongoose = require('mongoose')

const uri = 'mongodb://heroku_87rqk2w0:rgpluegdvrg1upq91f0mcg542g@ds047447.mlab.com:47447/heroku_87rqk2w0'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: true
})