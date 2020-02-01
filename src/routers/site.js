const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('', (req, res) => {
    res.render('index', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/login', (req, res) => {
    res.render('login', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/account', (req, res) => {
    res.render('account', {
        developer: 'Hugo Vela'
    })
})

router.get('/home', (req, res) => {
    res.render('home', {
        developer: 'Hugo Vela'
    })
})

router.get('/tasks', (req, res) => {
    res.render('tasks', {
        developer: 'Hugo Vela'
    })
})

router.get('/tasks/create', (req, res) => {
    res.render('create', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/logout', (req, res) => {
    res.render('logout', {
        developer: 'Hugo Vela'
    })
})

router.get('/no-auth', (req, res) => {
    res.render('no-auth', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/profile', (req, res) => {
    res.render('profile', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/profile/update-profile', (req, res) => {
    res.render('update', {
        developer: 'Hugo Vela'
    })
})

router.get('/users/profile/reset', (req, res) => {
    res.render('reset', {
        developer: 'Hugo Vela'
    })
})

router.get('/tasks/details', (req, res) => {
    res.render('details', {
        developer: 'Hugo Vela'
    })
})

router.get('/tasks/details/edit', (req, res) => {
    res.render('edit', {
        developer: 'Hugo Vela'
    })
})

router.get('/tasks/delete', (req, res) => {
    res.render('delete', {
        developer: 'Hugo Vela'
    })
})

router.get('/groups', (req, res) => {
    res.render('collaborate', {
        developer: 'Hugo Vela'
    })
})

router.get('/groups/create', (req, res) => {
    res.render('groups', {
        developer: 'Hugo Vela'
    })
})

router.get('/groups/details', (req, res) => {
    res.render('group-details', {
        developer: 'Hugo Vela'
    })
})

module.exports = router