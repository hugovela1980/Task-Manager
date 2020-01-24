console.log('client side update.js is working')
import { getUserProfile, updateProfile } from './functions'

const userProfileDiv = document.querySelector('#user-profile')
const nameInput = document.querySelector('#update-name')
const ageInput = document.querySelector('#update-age')
const emailInput = document.querySelector('#update-email')

getUserProfile().then(({ name, age, email }) => {
    nameInput.setAttribute('placeholder', name)
    ageInput.setAttribute('placeholder', age)
    emailInput.setAttribute('placeholder', email)
}).catch((e) => {
    console.log(e)
})

document.querySelector('#cancel').addEventListener('click', (e) => {
    location.replace('/users/profile')
})

document.querySelector('#update').addEventListener('submit', (e) => {
    e.preventDefault()
    const updates = {
        name: e.target.elements.name.value,
        age: e.target.elements.age.value,
        email: e.target.elements.email.value
    }

    updateProfile(updates).then((data) => {
        location.replace('/users/profile')
    }).catch((e) => {
        console.log(e)
    })
})