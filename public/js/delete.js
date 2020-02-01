console.log('client side delete.js is working')
import { renderSingleTask, deleteTask } from './functions'

const id = location.hash.substring(1)

renderSingleTask(id)

document.querySelector('#delete_delete_btn').addEventListener('click', (e) => {
    deleteTask(id).then((data) => {
        location.replace('/tasks')
    })
})

document.querySelector('#delete_cancel_btn').addEventListener('click', (e) => {
    location.replace(`/tasks/details#${id}`)
})
