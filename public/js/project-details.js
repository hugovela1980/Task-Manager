console.log('client side project-details.js is working')

import { renderSingleProject } from './functions'

const id = location.hash.substring(1)

renderSingleProject(id)

document.querySelector('#details_edit_btn').addEventListener('click', (e) => {
    location.replace(`/projects/edit#${id}`)
})

document.querySelector('#details_add-tasks_btn').addEventListener('click', (e) => {
    location.replace(`/projects/tasks#${id}`)
})


document.querySelector('#details_back_btn').addEventListener('click', (e) => {
    location.replace('/projects')
})