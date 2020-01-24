console.log('client side JS is working')
if (localStorage.getItem('authToken')) {
    location.replace('/home')
}