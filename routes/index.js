const { Router } = require('express')
const { login, usernameCheck, emailCheck, writeToDatabase } = require('../dbHandlers')

const router = new Router()

router.post('/login', (req, res) => {
    console.log(req.body)
    const userLogin = req.body
    let result = {}
    let findUser = login(userLogin)
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

router.post('/signup', (req, res) => {
    const userSignup = req.body
    let newEmail = userSignup.email.toLowerCase()
    let checkUsername = usernameCheck(userSignup)
    let checkEmail = emailCheck(newEmail)
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
        writeToDatabase(userSignup)
    }
    res.json(result)
})

module.exports = router
