const mongoose = require('mongoose')
const User = require('./user')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of group is required'],
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: true
})

projectSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'projects',
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project