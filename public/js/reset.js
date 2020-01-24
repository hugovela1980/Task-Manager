console.log('client side reset.js is working')
import { changePassword } from './functions'

document.querySelector('#cancel').addEventListener('click', (e) => {
    location.replace('/users/profile')
})

document.querySelector('#change-password').addEventListener('submit', (e) => {
    e.preventDefault()
    const oldPassword = e.target.elements.oldPassword.value
    const newPassword = e.target.elements.newPassword.value
    const confirmPassword = e.target.elements.confirmPassword.value
    const errorMessageEl = document.createElement('p')

    if (newPassword !== confirmPassword && newPassword === '' || confirmPassword === '') {
        errorMessageEl.textContent = 'There is a problem with the passwords.  Please try again.'
        document.querySelector('body').appendChild(errorMessageEl)
        return
    }
    
    const userData = {
        oldPassword,
        newPassword
    }
    
    changePassword(userData).then((response) => {
        location.replace('/users/profile')
    }).catch((e) => {
        errorMessageEl.textContent = e
        document.querySelector('body').appendChild(errorMessageEl)
    })

})
