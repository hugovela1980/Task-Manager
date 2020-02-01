const mongoose = require('mongoose')
const moment = require('moment')

const taskSchema = new mongoose.Schema({
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
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Group'
    }
}, {
    timestamps: true
})

taskSchema.virtual('groups', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'tasks'
})

taskSchema.statics.sortTasksByDate = async (tasks) => {
    tasks.sort((a, b) => new Date(moment(a.date, 'MMMM DD, YYYY')) > new Date(moment(b.date, 'MMMM DD,YYYY')) ? 1 : -1)
}

taskSchema.statics.nextSevenDays = async (tasks) => {
    const sevenDaysFromNow = moment().add(7, 'days')

    const tasksSevenDaysAhead = tasks.filter((task) => {
        const taskDay = moment(task.date, 'MMMM DD, YYYY')
        return sevenDaysFromNow.diff(taskDay, 'days') <= 7 &&  sevenDaysFromNow.diff(taskDay, 'days') >= 1
    })

    return tasksSevenDaysAhead
}

taskSchema.statics.todaysTasks = async (tasks) => {
    const todaysTasks = tasks.filter((task) => {
        const taskDate = moment(task.date, 'MMMM DD, YYYY')
        return new Date(taskDate).getDate() === new Date().getDate()
            && new Date(taskDate).getMonth() === new Date().getMonth()
            && new Date(taskDate).getFullYear() === new Date().getFullYear()
    })

    return todaysTasks
}

taskSchema.pre('save', async function(next) {
    const task = this

    if (task.isModified('date')) {
        const parsedDate = moment(task.date, 'MM/DD/YYYY')
        task.date = parsedDate.format('MMMM DD, YYYY')
    }

    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task