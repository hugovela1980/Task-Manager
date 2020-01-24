import { createUser } from './functions'
console.log('client side create-account.js is working')

document.querySelector('#create-account').addEventListener('submit', (e) => {
    e.preventDefault()
    const userData = {
        name: e.target.elements.name.value,
        age: e.target.elements.age.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
    }
    
    createUser(userData).then((response) => {
        location.replace('/home')
    }).catch((e) => {
        console.log(e)
    })
})