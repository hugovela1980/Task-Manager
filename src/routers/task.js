const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/details/edit', auth, async (req, res) => {
    const task = await Task.findById(req.query.id)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'date', 'location', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates'})
    }
    
    try {
        updates.forEach((update) => {
            if (req.body[update])
            task[update] = req.body[update]
        })
        
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(404).send()
    }

})

router.delete('/tasks/delete', auth, async (req, res) => {
    const id = req.query.id
    try {
        const task = await Task.findByIdAndDelete(id)
        
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
    
})

router.get('/tasks/search-tasks', auth, async (req, res) => {
    const keywords = req.query.keywords.toLowerCase()

    try {
        await req.user.populate('tasks').execPopulate()
        const tasks = req.user.tasks
        
        const filteredTasks = tasks.filter((task) => {
            return task.title.toLowerCase().includes(keywords)
            || task.date.toLowerCase().includes(keywords)
            || task.location.toLowerCase().includes(keywords)
            || task.description.toLowerCase().includes(keywords)
        })

        if (filteredTasks === 0) {
            return res.status(404).send({ message: 'No tasks match your search terms'})
        }
        
        await Task.sortTasksByDate(filteredTasks)

        res.send(filteredTasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/all-tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        await Task.sortTasksByDate(req.user.tasks)
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/next-seven-days', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        const tasksSevenDaysAhead = await Task.nextSevenDays(req.user.tasks)
        await Task.sortTasksByDate(tasksSevenDaysAhead)

        res.send(tasksSevenDaysAhead)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/today', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        const todaysTasks = await Task.todaysTasks(req.user.tasks)

        res.send(todaysTasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/data', auth, async (req, res) => {
    const id = req.query.id
    
    try {
        const task = await Task.findById(id)
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router