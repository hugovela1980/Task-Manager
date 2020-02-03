console.log('client side collaborate.js is working')
import { renderProjects } from './functions'

renderProjects().then((data) => {
//   console.log(data)
}).catch((e) => {
    console.log(e)
})


document.querySelector('#collaborate_create-project_btn').addEventListener('click', (e) => {
    location.replace('/projects/create')
})