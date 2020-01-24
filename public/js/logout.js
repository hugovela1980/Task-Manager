console.log('Client side logout.js is working')
import { logoutUser } from './functions'

logoutUser().then((res) => {
    localStorage.clear()
    setTimeout(() => {
        location.replace('/')
    }, 1500)
}).catch((e) => {
    console.log(e)
})
