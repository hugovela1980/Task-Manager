console.log('Client side update.js is working')
import { getUserProfile } from './functions'

const userProfileDiv = document.querySelector('#user-profile')
const userPasswordDiv = document.querySelector('#user-password')

const nameEl = document.querySelector('#name')
const ageEl = document.querySelector('#age')
const emailEl = document.querySelector('#email')
const passwordEl = document.querySelector('#password')

getUserProfile().then(({ name, age, email }) => {
    nameEl.textContent = `Name: ${name}`
    ageEl.textContent = `Age: ${age}`
    emailEl.textContent = `Email: ${email}`
    userProfileDiv.appendChild(nameEl)
    userProfileDiv.appendChild(ageEl)
    userProfileDiv.appendChild(emailEl)
}).catch((e) => {
    console.log(e)
})

document.querySelector('#edit-button').addEventListener('click', (e) => {
    location.replace('/users/profile/update-profile')    
})

document.querySelector('#change-password-button').addEventListener('click', (e) => {
    location.replace('/users/profile/reset')    
})