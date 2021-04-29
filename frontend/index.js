let form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

form.addEventListener('submit', () => {
    login()
})

async function login() {
    let loginUsername = document.getElementById('username').value
    let loginPassword = document.getElementById('password').value
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    console.log(data.success)

    if (data.success === false) {
        alert('Sorry! Could not log you in.')
    } else {
        window.location.href = 'success.html'
    }
}
