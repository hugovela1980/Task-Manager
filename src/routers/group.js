const express = require('express')
const Group = require('../models/groups')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

router.post('/groups', auth, async (req, res) => {
    const creator = req.user._id
    req.body.collaborators.push(creator)

    const group = new Group({
        ...req.body,
        creator
    })
    
    try {
        await group.save()
        res.status(201).send(group)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/groups/all-groups', auth, async (req, res) => {
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
        await req.user.populate('createdGroups').execPopulate()
        const adminGroups = req.user.createdGroups.map(group => {
            return {_id: group._id, name: group.name}
        })
        await req.user.populate('groups').execPopulate()
        const userGroups = req.user.groups.map(group => {
            return {_id: group._id, name: group.name}
        })
        
        const groups = {
            adminGroups,
            userGroups
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