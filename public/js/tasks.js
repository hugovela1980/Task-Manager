console.log('client side tasks.js is working')
import { renderTasks, searchAllTasks } from './functions'

const allTasksButton = document.querySelector('#all-tasks')
const todayButton = document.querySelector('#today')
const nextSevenDaysButton = document.querySelector('#next-seven-days')
const searchTasksButton = document.querySelector('#search-tasks')

renderTasks(allTasksButton.id)

allTasksButton.addEventListener('click', (e) => {
    renderTasks(allTasksButton.id)
})

todayButton.addEventListener('click', (e) => {
    renderTasks(todayButton.id)
})

nextSevenDaysButton.addEventListener('click', (e) => {
    renderTasks(nextSevenDaysButton.id)
})

searchTasksButton.addEventListener('click', (e) => {
    const searchDiv = document.querySelector('#search-input')
    const searchBox = document.createElement('input')
    searchBox.setAttribute('type', 'text')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    
    searchDiv.appendChild(searchBox)
    searchDiv.appendChild(cancelButton)
    
    searchBox.addEventListener('input', (e) => {
        localStorage.setItem('keywords', e.target.value)

        searchAllTasks(e.target.value).then((tasks) => {
            renderTasks(searchTasksButton.id)
        }).catch((e) => {
            console.log(e)
        })
    })

    cancelButton.addEventListener('click', (e) => {
        location.reload()
    })
})