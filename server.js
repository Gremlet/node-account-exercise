const express = require('express')
const lowdb = require('lowdb')
const port = 8080
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('accounts.json')

const db = lowdb(adapter)

const app = express()

app.use(express.json())
app.use(express.static('frontend'))

function initialiseDatabase() {
    db.defaults({ accounts: [] }).write()
}

app.post('/api/login', (req, res) => {
    console.log(req.body)
    const userLogin = req.body
    let result = {}
    let findUser = db.get('accounts').find(userLogin).value()
    // or .find({username: userLogin.username, password: userLogin.password})

    if (findUser) {
        console.log('Successfully logged in', findUser.username)
        result.success = true
        res.json(result)
    } else {
        console.log('Could not log in')
        result.success = false
        res.json(result)
    }
})

app.post('/api/signup', (req, res) => {
    const userSignup = req.body
    let newEmail = userSignup.email.toLowerCase()
    let checkUsername = db.get('accounts').find({ username: userSignup.username }).value()
    let checkEmail = db.get('accounts').find({ email: newEmail }).value()
    let result = {
        usernameExists: false,
        emailExists: false,
        success: false,
    }

    if (checkUsername) {
        console.log('username exists')
        result.usernameExists = true
    }

    if (checkEmail) {
        console.log('email exists')
        result.emailExists = true
    }
    if (!result.usernameExists && !result.emailExists) {
        result.success = true
        db.get('accounts').push(userSignup).write()
    }
    res.json(result)
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
    initialiseDatabase()
})
