console.log('client side JS is working')

import { loginUser, token } from './functions'

document.querySelector('#login').addEventListener('submit', (e) => {
    e.preventDefault()

    const userCredentials = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
    }
    
    loginUser(userCredentials).then((response) => {
        location.replace('/home')
    }).catch((e) => {
        console.log(e)
    })
    

})