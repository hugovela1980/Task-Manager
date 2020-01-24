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

export const createEvent = async (eventData) => {
    const response = await fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(eventData)
    })
    
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        const data = await response.json()
        throw new Error(data.message)
    }
}

export const deleteEvent = async (id) => {
    const response = await fetch(`/events/delete?id=${id}`, {
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

export const renderSingleEvent = async (id) => {
    const event = await getEventById(id)
    document.querySelector('#title_label').textContent = event.title
    document.querySelector('#date_label').textContent = event.date
    document.querySelector('#location_label').textContent = event.location
    document.querySelector('#description_label').textContent = event.description
}

export const renderEvents = async (domId) => {
    const eventsDiv = document.querySelector('#events')
    let events
    eventsDiv.innerHTML = ''

    if (domId === 'search-events') {
        events = await searchAllEvents(localStorage.getItem('keywords'))
    } else {
        events = await getAllEvents(domId)
    }
    
    events.forEach((event) => {
        const eventEl = generateEventDOM(event)        
        eventsDiv.appendChild(eventEl)
    })
}

const generateEventDOM = (event) => {
    const eventEl = document.createElement('a')
    eventEl.classList.add('list-item')
    eventEl.setAttribute('href', `/events/details#${event._id}`)

    const titleEl = document.createElement('h3')
    titleEl.textContent = event.title
    eventEl.appendChild(titleEl)

    const dateEl = document.createElement('p')
    dateEl.textContent = event.date
    eventEl.appendChild(dateEl)

    return eventEl
}

export const searchAllEvents = async (searchText) => {
    const response = await fetch(`/events/search-events?keywords=${searchText}`, {
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

const getAllEvents = async (domId) => {
    const response = await fetch(`/events/${domId}`, {
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
        throw new Error('Unable to fetch events')
    }
}

export const getEventById = async (id) => {
    const response = await fetch(`/events/data?id=${id}`, {
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
        throw new Error('Unable to fetch event')
    }
}

export const editEvent = async (id, eventData) => {
    const response = await fetch(`/events/details/edit?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(eventData)
    })

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error(data.message)
    }
}

export const findCollaborators = async (searchTerms) => {
    const response = await fetch(`/groups/collaborators?keywords=${searchTerms}`, {
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
    const addCollaboratorsSection = document.querySelector('#groups_add_div')
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
    
    // append all elements
    
    // return collaborator
    return collaboratorEl
}

export const renderAddedCollaborators = async (addedCollaborators) => {
    // Create added collaborators div
    const addCollaboratorsSection = document.querySelector('#groups_add_div')
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

export const createGroup = async (name) => {
    const collaboratorsJSON = JSON.parse(localStorage.getItem('addedCollaborators'))
    const collaborators = collaboratorsJSON.map(collaborator => collaborator._id)
    const newGroup = { name, collaborators }
    
    const response = await fetch('/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newGroup)
    })
    
    console.log(response.status)
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        throw new Error('unable to create a group')
    }
}

const getGroups = async () => {
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

export const renderGroups = async () => {
    const { adminGroups, userGroups } = await getGroups()
    const userGroupsDiv = document.querySelector('#userGroups')
    const adminGroupsDiv = document.querySelector('#adminGroups')
    userGroups.forEach(group => console.log(group.administrator))

    adminGroups.forEach(async (group) => {
        const groupEl = await generateGroupEl(group)
        adminGroupsDiv.appendChild(groupEl)
    })

    userGroups.forEach(async (group) => {
        const groupEl = await generateGroupEl(group)
        userGroupsDiv.appendChild(groupEl)
    })
}

const generateGroupEl = async (group) => {
    const groupEl = document.createElement('a')
        groupEl.setAttribute('href', `/groups/details#${group._id}`)
        groupEl.className = 'groupEl'
    const groupNameEl = document.createElement('p')
        groupNameEl.className = 'group-title'
        groupNameEl.textContent = `Name: ${group.name}`
    groupEl.appendChild(groupNameEl)
    const administratorEl = document.createElement('p')
        administratorEl.textContent = await getGroupAdministrator(group.administrator) + '...'
    groupEl.appendChild(administratorEl)

    return groupEl
}

const getGroupCollaborator = async (collaborator) => {
    const response = await fetch(`/groups/get-group-collaborators?id=${collaborator}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data.name
    } else {
        throw new Error('unable to get collaborators')
    }
}

const getGroupAdministrator = async (administrator) => {
    const response = await fetch(`/groups/get-group-administrator?id=${administrator}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data.name
    } else {
        throw new Error('unable to get collaborators')
    }
}