const saveToken = (token) => {
    localStorage.setItem('authToken', token)
}

export const createUser = async (userData) => {
    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })

    if (response.status === 201) {
        const data = await response.json()
        saveToken(data.token)
        return data
    } else {
        throw new Error('Unable to create an account')
    }
}

export const updateProfile = async (updates) => {
    const response = await fetch('/users/profile/update-profile', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(updates)
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to edit profile')
    }
}

export const changePassword = async (passwords) => {
    const response = await fetch('/users/profile/change-password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(passwords)
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to change password.  Try again')
    }
}

export const loginUser = async (userCredentials) => {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
    })
    
    if (response.status === 200) {
        const data = await response.json()
        saveToken(data.token)
        return data
    } else {
        throw new Error('Unable to login')
    }
}

export const logoutUser = async () => {
    const response = await fetch('/users/logout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        return await response.json()
    } else {
        throw new Error()
    }
} 

export const getUserProfile = async () => {
    const response = await fetch('/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to get user profile')
    }
}

export const createTask = async (taskData) => {
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(taskData)
    })
    
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        const data = await response.json()
        throw new Error(data.message)
    }
}

export const deleteTask = async (id) => {
    const response = await fetch(`/tasks/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    
    if (response.status === 200) {
        console.log('testing...')
        const data = await response.json()
        console.log(data)
    } else {
        throw new Error('Unable to delete event')
    }
}

export const renderSingleTask = async (id) => {
    const event = await getTaskById(id)
    document.querySelector('#title_label').textContent = event.title
    document.querySelector('#date_label').textContent = event.date
    document.querySelector('#location_label').textContent = event.location
    document.querySelector('#description_label').textContent = event.description
}

export const renderTasks = async (domId) => {
    const tasksDiv = document.querySelector('#tasks')
    let tasks
    tasksDiv.innerHTML = ''

    if (domId === 'search-tasks') {
        tasks = await searchAllTasks(localStorage.getItem('keywords'))
    } else {
        tasks = await getAllTasks(domId)
    }
    
    tasks.forEach((task) => {
        const taskEl = generateTaskDOM(task)        
        tasksDiv.appendChild(taskEl)
    })
}

const generateTaskDOM = (task) => {
    const taskEl = document.createElement('a')
    taskEl.classList.add('list-item')
    taskEl.setAttribute('href', `/tasks/details#${task._id}`)

    const titleEl = document.createElement('h3')
    titleEl.textContent = task.title
    taskEl.appendChild(titleEl)

    const dateEl = document.createElement('p')
    dateEl.textContent = task.date
    taskEl.appendChild(dateEl)

    return taskEl
}

export const searchAllTasks = async (searchText) => {
    const response = await fetch(`/tasks/search-tasks?keywords=${searchText}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error(response.message)
    }
}

const getAllTasks = async (domId) => {
    const response = await fetch(`/tasks/${domId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch tasks')
    }
}

export const getTaskById = async (id) => {
    const response = await fetch(`/tasks/data?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch task')
    }
}

export const editTask = async (id, taskData) => {
    const response = await fetch(`/tasks/details/edit?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(taskData)
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error(data.message)
    }
}

export const findCollaborators = async (searchTerms) => {
    const response = await fetch(`/projects/collaborators?keywords=${searchTerms}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        saveCollaborators(data)
        return data
    } else {
        throw new Error(data.message)
    }
}

const saveCollaborators = (collaborators) => {
    localStorage.setItem('collaborators', JSON.stringify(collaborators))
}

export const loadCollaborators = () => {
    const collaborators = JSON.parse(localStorage.getItem('collaborators'))
    return collaborators ? collaborators : []
}

const saveAddedCollaborators = (collaborators) => {
    localStorage.setItem('addedCollaborators', JSON.stringify(collaborators))
}

const loadAddedCollaborators = () => {
    const addedCollaborators = JSON.parse(localStorage.getItem('addedCollaborators'))
    return addedCollaborators ? addedCollaborators : [] 
}

export const renderCollaborators = async (collaborators) => {
    // Create search results div
    const addCollaboratorsSection = document.querySelector('#projects_add_div')
        addCollaboratorsSection.innerHTML = ''
    const findCollaboratorsResultsDiv = document.createElement('div')
    findCollaboratorsResultsDiv.innerHTML = ''
    
    // Loop thru all collaborators and call render function render their name, and email
    collaborators.forEach(collaborator => {
        const collaboratorEl = generateCollaboratorDOM(collaborator)
        findCollaboratorsResultsDiv.appendChild(collaboratorEl)
    })
    
    addCollaboratorsSection.appendChild(findCollaboratorsResultsDiv)
}

const generateCollaboratorDOM = (collaborator) => {
    // create elements: p, spans
    const collaboratorEl = document.createElement('p')
    collaboratorEl.className = 'list-item'
    const nameEl = document.createElement('strong')
    nameEl.textContent = `${collaborator.name}, `
    const emailEl = document.createElement('span')
    emailEl.textContent = collaborator.email
    
    // append all elements
    collaboratorEl.appendChild(nameEl)
    collaboratorEl.appendChild(emailEl)

    // add event handler for clicking on p element
    collaboratorEl.addEventListener('click', (e) => {
        // add collaborator to addedCollaborators in local storage
        let addedCollaborators = loadAddedCollaborators()
        addedCollaborators.push(collaborator)
        saveAddedCollaborators(addedCollaborators)

        // remove collaborator from collaborators in local storage
        const collaborators = loadCollaborators()
        const collaboratorIndex = collaborators.findIndex((item) => item._id === collaborator._id)
        collaborators.splice(collaboratorIndex, 1)
        saveCollaborators(collaborators)
        
        // call added collaborators render function
        renderCollaborators(collaborators)
        addedCollaborators = JSON.parse(localStorage.getItem('addedCollaborators'))
        renderAddedCollaborators(addedCollaborators)
    })
    
    // return collaborator
    return collaboratorEl
}

export const renderAddedCollaborators = async (addedCollaborators) => {
    // Create added collaborators div
    const addCollaboratorsSection = document.querySelector('#projects_add_div')
    const addCollaboratorDiv = document.createElement('div')
        addCollaboratorDiv.className = 'add-collaborator-div'
        addCollaboratorDiv.innerHTML = ''
        addCollaboratorDiv.textContent = 'Added Collaborators'
    
    // Loop thru all collaborators and call render function render their name, and email
    addedCollaborators.forEach((addedCollaborator) => {
        const addedCollaboratorEl = generateAddedCollaboratorDOM(addedCollaborator)
        addCollaboratorDiv.appendChild(addedCollaboratorEl)
    })

    addCollaboratorsSection.appendChild(addCollaboratorDiv)
}

const generateAddedCollaboratorDOM = (addedCollaborator) => {
    // create elements: p (name), remove button
    const addedCollaboratorEl = document.createElement('p')
        addedCollaboratorEl.className = 'add-collaborator-list-item'
    const nameEl = document.createElement('span')
        nameEl.textContent = addedCollaborator.name
        nameEl.className = 'collaborator-name'
    const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.className = 'collaborator-remove'

    // append all elements
    addedCollaboratorEl.appendChild(removeButton)
    addedCollaboratorEl.appendChild(nameEl)

    // add event handler for clicking on remove button
    removeButton.addEventListener('click', (e) => {
        // add collaborator to collaborators in local storage
        let collaborators = loadCollaborators()
        collaborators.push(addedCollaborator)
        saveCollaborators(collaborators)
        
        // remove collaborator from addedCollaborators in local storage
        const addedCollaborators = loadAddedCollaborators()
        const addedCollaboratorIndex = addedCollaborators.findIndex((item) => item._id === addedCollaborator._id)
        addedCollaborators.splice(addedCollaboratorIndex, 1)
        saveAddedCollaborators(addedCollaborators)
        
        collaborators = JSON.parse(localStorage.getItem('collaborators'))
        renderCollaborators(collaborators)
        renderAddedCollaborators(addedCollaborators)
    })
        
    // return addedCollaborator 
    return addedCollaboratorEl
}

export const createProject = async (name) => {
    const collaboratorsJSON = JSON.parse(localStorage.getItem('addedCollaborators'))
    const collaborators = collaboratorsJSON.map(collaborator => collaborator._id)
    const newProject = { name, collaborators }
    
    const response = await fetch('/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newProject)
    })
    
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        throw new Error('unable to create a group')
    }
}

const getProjects = async () => {
    const response = await fetch('/collaborate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('unable to get groups')
    }
}

const getProjectById = async (id) => {
    const response = await fetch(`/projects/data?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch task')
    }
}

export const renderSingleProject = async (id) => {
        const project = await getProjectById(id)
        document.querySelector('#project-details_name_label').textContent = project.name
        document.querySelector('#project-details_creator_label').textContent = `Creator: ${project.creator}`
        document.querySelector('#project-details_collaborators_label').textContent = `Collaborators: ${project.collaborators}`
        document.querySelector('#project-details_tasks_label').textContent = `Tasks: ${project.tasks}`
}

export const renderProjects = async () => {
    const { adminProjects, userProjects } = await getProjects()
    const userProjectsDiv = document.querySelector('#userProjects')
    const adminProjectsDiv = document.querySelector('#adminProjects')

    adminProjects.forEach(async (project) => {
        const projectEl = await generateProjectEl(project)
        adminProjectsDiv.appendChild(projectEl)
    })

    userProjects.forEach(async (project) => {
        const projectEl = await generateProjectEl(project)
        userProjectsDiv.appendChild(projectEl)
    })
}

const generateProjectEl = async (project, type) => {
    const projectEl = document.createElement('a')
    projectEl.setAttribute('href', `/projects/details#${project._id}`)
    projectEl.className = 'projectEl'
    const projectNameEl = document.createElement('p')
    projectNameEl.className = 'group-title'
    projectNameEl.textContent = `Name: ${project.name}`
    projectEl.appendChild(projectNameEl)
    
    return projectEl
}

// const getGroupCollaborator = async (collaborator) => {
//     const response = await fetch(`/groups/get-group-collaborators?id=${collaborator}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//         }
//     })

//     if (response.status === 200) {
//         const data = await response.json()
//         return data.name
//     } else {
//         throw new Error('unable to get collaborators')
//     }
// }

// const getGroupAdministrator = async (administrator) => {
//     const response = await fetch(`/groups/get-group-administrator?id=${administrator}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//         }
//     })

//     if (response.status === 200) {
//         const data = await response.json()
//         return data.name
//     } else {
//         throw new Error('unable to get collaborators')
//     }
// }