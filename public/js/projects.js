console.log('client side project.js is working')
import { findCollaborators, renderCollaborators, createProject, renderAddedCollaborators } from './functions'

localStorage.removeItem('collaborators')
localStorage.removeItem('addedCollaborators')

document.querySelector('#projects_add_div').textContent = 'Search for users to add to your project'

document.querySelector('#find-collaborators-input').addEventListener('input', async (e) => {
    try {
        // store all collaborators in local storage
        const collaborators = await findCollaborators(e.target.value)
        
        // call render functions
        renderCollaborators(collaborators)
        
    } catch(e) {
        document.querySelector('#projects_add_div').textContent = 'No users found'
        console.log(e)
    }
})

document.querySelector('#projects_find_form').addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        // request a group creation with the added collaborators and the name of the group
        const project = await createProject(e.target.elements.name.value)    
        console.log(project)
    } catch(e) {
        console.log(e)
    }
    
    // blank out collaborator local storage data
    localStorage.removeItem('collaborators')
    localStorage.removeItem('addedCollaborators')
    
    // go to back Collaborate page
    location.replace('/projects')
})