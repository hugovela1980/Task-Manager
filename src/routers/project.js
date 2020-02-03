const express = require('express')
const Project = require('../models/project')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

router.post('/projects', auth, async (req, res) => {
    const creator = req.user._id
    req.body.collaborators.push(creator)

    const project = new Project({
        ...req.body,
        creator
    })
    
    try {
        await project.save()
        res.status(201).send(project)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/projects/all-projects', auth, async (req, res) => {
    try {
        await req.user.populate('projects').execPopulate()
        res.send(req.user.projects)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/projects/collaborators', auth, async (req, res) => {
    const keywords = req.query.keywords.toLowerCase()
    
    try {
        const users = await User.find({})
        
        const filteredUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(keywords)
                || user.email.toLowerCase().includes(keywords)
        })
    
        if (filteredUsers.length === 0) {
            return res.status(404).send({ message: 'Unable to find any users' })
        }

        res.send(filteredUsers)
    } catch {
        res.status(500).send()
    }
})

router.get('/collaborate', auth, async (req, res) => {
    try {
        await req.user.populate('createdProjects').execPopulate()
        console.log('projects')
        const adminProjects = req.user.createdProjects.map(project => {
            return {_id: project._id, name: project.name}
        })
        await req.user.populate('projects').execPopulate()
        const userProjects = req.user.projects.map(project => {
            return {_id: project._id, name: project.name}
        })
        
        const projects = {
            adminProjects,
            userProjects
        }
        res.send(projects)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/projects/get-project-collaborators', auth, async (req, res) => {
    const _id = req.query.id
    try {
        const collaborator = await User.findById(_id)
        res.send(collaborator)
    } catch(e) {
        res.status(404).send()
    }
})

router.get('/projects/get-project-administrator', auth, async (req, res) => {
    const _id = req.query.id
    try {
        const administrator = await User.findById(_id)
        res.send(administrator)
    } catch(e) {
        res.status(404).send()
    }
})

router.get('/projects/data', auth, async (req, res) => {
    const id = req.query.id
    
    try {
        const projectData = await Project.findById(id)
        await projectData.populate('collaborators').execPopulate()
        const collaborators = projectData.collaborators.map(collaborator => collaborator.name)
        await projectData.populate('tasks').execPopulate()
        const tasks = projectData.tasks.map(task => task.title)
        
        
        const project = {
            name: projectData.name,
            collaborators,
            creator: req.user.name,
            tasks: !tasks === [] ? tasks : 'No tasks created yet'
        }
        
        res.send(project)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router