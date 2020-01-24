console.log('client side create.js is working')

import { createEvent } from './functions'

document.querySelector('#cancel').addEventListener('click', (e) => {
    location.replace('/events')
})

document.querySelector('#create-event-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const eventData = {
        title: e.target.elements.title.value,
        date: e.target.elements.date.value,
        location: e.target.elements.location.value,
        description: e.target.elements.description.value,
    }

    createEvent(eventData).then((data) => {
        location.replace('/events')
    }).catch((e) => {
        console.log(e)
    })
})