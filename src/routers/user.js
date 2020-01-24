const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/users/profile/update-profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation =  updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Update(s)' })
    }
    
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/users/profile/change-password', auth, async (req, res) => {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const isPasswordValidated = await req.user.validatePassword(oldPassword)
    
    if(!isPasswordValidated) {
       return res.status(400).send({ error: 'Password does not match'}) 
    }

    try {
        console.log(req.user.password)
        req.user.password = newPassword
        await req.user.save()
        console.log()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/me/', auth, async (req, res) => {
        res.send(req.user)
})

module.exports = router