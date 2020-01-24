const express = require('express')
const Group = require('../models/groups')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

router.post('/groups', auth, async (req, res) => {
    const group = new Group({
        ...req.body,
        administrator: req.user._id
    })

    try {
        await group.save()
        res.status(201).send(group)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/groups/all-groups', auth, async (req, res) => {
    console.log(req.user)
    try {
        await req.user.populate('groups').execPopulate()
        res.send(req.user.groups)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/groups/collaborators', auth, async (req, res) => {
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
        await req.user.populate('groups').execPopulate()
        const adminGroups = req.user.groups
        const allGroups = await Group.find({})
        const userGroups = allGroups.filter((group) => group.collaborators.includes(req.user.id))
        
        const groups = {
            adminGroups: adminGroups,
            userGroups: userGroups
        }
        
        res.send(groups)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/groups/get-group-collaborators', auth, async (req, res) => {
    const _id = req.query.id
    try {
        const collaborator = await User.findById(_id)
        res.send(collaborator)
    } catch(e) {
        res.status(404).send()
    }
})

router.get('/groups/get-group-administrator', auth, async (req, res) => {
    const _id = req.query.id
    try {
        const administrator = await User.findById(_id)
        res.send(administrator)
    } catch(e) {
        res.status(404).send()
    }
})

module.exports = router