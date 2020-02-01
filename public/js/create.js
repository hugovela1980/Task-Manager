console.log('client side create.js is working')

import { createTask } from './functions'

document.querySelector('#cancel').addEventListener('click', (e) => {
    location.replace('/tasks')
})

document.querySelector('#create-task-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const taskData = {
        title: e.target.elements.title.value,
        date: e.target.elements.date.value,
        location: e.target.elements.location.value,
        description: e.target.elements.description.value,
    }

    createTask(taskData).then((data) => {
        location.replace('/tasks')
    }).catch((e) => {
        console.log(e)
    })
})