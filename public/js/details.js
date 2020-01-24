console.log('client side details.js is working')
import { renderSingleEvent } from './functions'

const id = location.hash.substring(1)

renderSingleEvent(id)

document.querySelector('#details_edit_button').addEventListener('click', (e) => {
    location.replace(`/events/details/edit#${id}`)
})

document.querySelector('#details_back_btn').addEventListener('click', (e) => {
    location.replace('/events')
})

document.querySelector('#details_delete_btn').addEventListener('click', (e) => {
    location.replace(`/events/delete#${id}`)
})
