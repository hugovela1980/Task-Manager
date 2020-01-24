console.log('client side edit.js is working')
import { getEventById, editEvent } from './functions'

const id = location.hash.substring(1)

getEventById(id).then((data) => {
    document.querySelector('#edit_title_input').setAttribute('placeholder', data.title)
    document.querySelector('#edit_date_input').setAttribute('placeholder', data.date)
    document.querySelector('#edit_location_input').setAttribute('placeholder', data.location)
    document.querySelector('#edit_description_input').setAttribute('placeholder', data.description)
})

document.querySelector('#edit_cancel_button').addEventListener('click', (e) => {
    location.replace(`/events/details#${id}`)
})

document.querySelector('#edit_form').addEventListener('submit', (e) => {
    e.preventDefault()

    const eventData = {
        title: e.target.elements.title.value,
        date: e.target.elements.date.value,
        location: e.target.elements.location.value,
        description: e.target.elements.description.value
    }

    editEvent(id, eventData).then((data) => {
        console.log(data)
        location.replace(`/events/details#${id}`)
    }).catch((e) => {
        console.log(e)
    })
})