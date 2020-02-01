console.log('client side edit.js is working')
import { getTaskById, editTask } from './functions'

const id = location.hash.substring(1)

getTaskById(id).then((data) => {
    document.querySelector('#edit_title_input').setAttribute('placeholder', data.title)
    document.querySelector('#edit_date_input').setAttribute('placeholder', data.date)
    document.querySelector('#edit_location_input').setAttribute('placeholder', data.location)
    document.querySelector('#edit_description_input').setAttribute('placeholder', data.description)
})

document.querySelector('#edit_cancel_button').addEventListener('click', (e) => {
    location.replace(`/tasks/details#${id}`)
})

document.querySelector('#edit_form').addEventListener('submit', (e) => {
    e.preventDefault()

    const taskData = {
        title: e.target.elements.title.value,
        date: e.target.elements.date.value,
        location: e.target.elements.location.value,
        description: e.target.elements.description.value
    }

    editTask(id, taskData).then((data) => {
        console.log(data)
        location.replace(`/tasks/details#${id}`)
    }).catch((e) => {
        console.log(e)
    })
})