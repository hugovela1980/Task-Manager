const mongoose = require('mongoose')
const User = require('../models/user')

const groupSchema = new mongoose.Schema({
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

groupSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'groups'
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group