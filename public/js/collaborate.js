console.log('client side collaborate.js is working')
import { renderGroups } from './functions'

renderGroups().then((data) => {
//   console.log(data)
}).catch((e) => {
    console.log(e)
})


document.querySelector('#collaborate_create-group_btn').addEventListener('click', (e) => {
    location.replace('/groups/create')
})