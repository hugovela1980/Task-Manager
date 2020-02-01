console.log('client side details.js is working')
import { renderSingleTask } from './functions'

const id = location.hash.substring(1)

renderSingleTask(id)

document.querySelector('#details_edit_button').addEventListener('click', (e) => {
    location.replace(`/tasks/details/edit#${id}`)
})

document.querySelector('#details_back_btn').addEventListener('click', (e) => {
    location.replace('/tasks')
})

document.querySelector('#details_delete_btn').addEventListener('click', (e) => {
    location.replace(`/tasks/delete#${id}`)
})
