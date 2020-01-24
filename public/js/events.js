console.log('client side events.js is working')
import { renderEvents, searchAllEvents } from './functions'

const allEventsButton = document.querySelector('#all-events')
const todayButton = document.querySelector('#today')
const nextSevenDaysButton = document.querySelector('#next-seven-days')
const searchEventsButton = document.querySelector('#search-events')

renderEvents(allEventsButton.id)

allEventsButton.addEventListener('click', (e) => {
    renderEvents(allEventsButton.id)
})
 
todayButton.addEventListener('click', (e) => {
    renderEvents(todayButton.id)
})
 
nextSevenDaysButton.addEventListener('click', (e) => {
    renderEvents(nextSevenDaysButton.id)
})

searchEventsButton.addEventListener('click', (e) => {
    const searchDiv = document.querySelector('#search-input')
    const searchBox = document.createElement('input')
    searchBox.setAttribute('type', 'text')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    
    searchDiv.appendChild(searchBox)
    searchDiv.appendChild(cancelButton)
    
    searchBox.addEventListener('input', (e) => {
        localStorage.setItem('keywords', e.target.value)

        searchAllEvents(e.target.value).then((events) => {
            renderEvents(searchEventsButton.id)
        }).catch((e) => {
            console.log(e)
        })
    })

    cancelButton.addEventListener('click', (e) => {
        location.reload()
    })
})