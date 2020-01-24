console.log('client side delete.js is working')
import { renderSingleEvent, deleteEvent } from './functions'

const id = location.hash.substring(1)

renderSingleEvent(id)

document.querySelector('#delete_delete_btn').addEventListener('click', (e) => {
    deleteEvent(id).then((data) => {
        location.replace('/events')
    })
})

document.querySelector('#delete_cancel_btn').addEventListener('click', (e) => {
    location.replace(`/events/details#${id}`)
})
