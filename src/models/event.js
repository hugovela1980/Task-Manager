const mongoose = require('mongoose')
const moment = require('moment')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'title is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'date is required'],
        validate(value) {
            const parsedDate = moment(value, 'MM/DD/YYYY')
            if (!parsedDate.isValid() || value.length < 10) {
                throw new Error('use MM/DD/YYYY format for the date')
            }
        }
    },
    location: {
        type: String,
        trim: true,
        default: 'No location specified',
    },
    description: {
        type: String,
        trim: true,
        default: 'No description specified',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

eventSchema.statics.sortEventsByDate = async (events) => {
    events.sort((a, b) => new Date(moment(a.date, 'MMMM DD, YYYY')) > new Date(moment(b.date, 'MMMM DD,YYYY')) ? 1 : -1)
}

eventSchema.statics.nextSevenDays = async (events) => {
    const sevenDaysFromNow = moment().add(7, 'days')

    const eventsSevenDaysAhead = events.filter((event) => {
        const eventDay = moment(event.date, 'MMMM DD, YYYY')
        return sevenDaysFromNow.diff(eventDay, 'days') <= 7 &&  sevenDaysFromNow.diff(eventDay, 'days') >= 1
    })

    return eventsSevenDaysAhead
}

eventSchema.statics.todaysEvents = async (events) => {
    const todaysEvents = events.filter((event) => {
        const eventDate = moment(event.date, 'MMMM DD, YYYY')
        return new Date(eventDate).getDate() === new Date().getDate()
            && new Date(eventDate).getMonth() === new Date().getMonth()
            && new Date(eventDate).getFullYear() === new Date().getFullYear()
    })

    return todaysEvents
}

eventSchema.pre('save', async function(next) {
    const event = this

    if (event.isModified('date')) {
        const parsedDate = moment(event.date, 'MM/DD/YYYY')
        event.date = parsedDate.format('MMMM DD, YYYY')
    }

    next()
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event