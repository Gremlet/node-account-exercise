let regForm = document.getElementById('reg-form')

regForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

regForm.addEventListener('submit', () => {
    register()
})

async function register() {
    let regUsername = document.getElementById('username-signup').value
    let regPassword = document.getElementById('password-signup').value
    let email = document.getElementById('email-signup').value

    const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username: regUsername, password: regPassword, email: email }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    console.log(data)

    if (data.success === false && data.usernameExists === true) {
        alert('That username is already in use')
    } else if (data.success === false && data.emailExists === true) {
        alert('That email address is already in use')
    } else if (data.success === true) {
        window.location.href = 'success.html'
    }
}
