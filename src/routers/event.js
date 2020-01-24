const express = require('express')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/events', auth, async (req, res) => {
    const event = new Event({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await event.save()
        res.status(201).send(event)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/events/details/edit', auth, async (req, res) => {
    const event = await Event.findById(req.query.id)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'date', 'location', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates'})
    }

    try {
        updates.forEach((update) => {
            if (req.body[update])
            event[update] = req.body[update]
        })
        await event.save()
        res.send(event)
    } catch(e) {
        res.status(404).send()
    }

})

router.delete('/events/delete', auth, async (req, res) => {
    const id = req.query.id
    try {
        const event = await Event.findByIdAndDelete(id)
        
        res.send(event)
    } catch(e) {
        res.status(500).send()
    }
    
})

router.get('/events/search-events', auth, async (req, res) => {
    const keywords = req.query.keywords.toLowerCase()

    try {
        await req.user.populate('events').execPopulate()
        const events = req.user.events
        
        const filteredEvents = events.filter((event) => {
            return event.title.toLowerCase().includes(keywords)
            || event.date.toLowerCase().includes(keywords)
            || event.location.toLowerCase().includes(keywords)
            || event.description.toLowerCase().includes(keywords)
        })

        if (filteredEvents === 0) {
            return res.status(404).send({ message: 'No events match your search terms'})
        }
        
        await Event.sortEventsByDate(filteredEvents)

        res.send(filteredEvents)
    } catch(e) {
        res.status(500).send()
    }
})


// router.get('/events/search', auth, async (req, res) => {
//     const keywords = req.query.keywords

//     try {
//         await req.user.populate('events').execPopulate()
//         const events = req.user.events
    
//         const filteredEvents = events.filter((event) => {
//             return event.title.toLowerCase().includes(keywords.toLowerCase())
//                 || event.date.toLowerCase().includes(keywords.toLowerCase())
//                 || event.location.toLowerCase().includes(keywords.toLowerCase())
//                 || event.description.toLowerCase().includes(keywords.toLowerCase())
//         })
        
//         if (filteredEvents.length === 0) {
//             return res.status(404).send({ message: 'No events match your search terms'})
//         }

//         res.send(filteredEvents)
//     } catch(e) {
//         res.status(404).send()
//     }

// })

router.get('/events/all-events', auth, async (req, res) => {
    try {
        await req.user.populate('events').execPopulate()
        await Event.sortEventsByDate(req.user.events)
        res.send(req.user.events)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/events/next-seven-days', auth, async (req, res) => {
    try {
        await req.user.populate('events').execPopulate()
        const eventsSevenDaysAhead = await Event.nextSevenDays(req.user.events)
        await Event.sortEventsByDate(eventsSevenDaysAhead)

        res.send(eventsSevenDaysAhead)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/events/today', auth, async (req, res) => {
    try {
        await req.user.populate('events').execPopulate()
        const todaysEvents = await Event.todaysEvents(req.user.events)

        res.send(todaysEvents)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/events/data', auth, async (req, res) => {
    const id = req.query.id
    
    try {
        const event = await Event.findById(id)
        res.send(event)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router