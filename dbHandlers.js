const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('accounts.json')
const db = lowdb(adapter)

function login(userLogin) {
    return db.get('accounts').find(userLogin).value()
}

function usernameCheck(userSignup) {
    return db.get('accounts').find({ username: userSignup.username }).value()
}

function emailCheck(newEmail) {
    return db.get('accounts').find({ email: newEmail }).value()
}

function writeToDatabase(userSignup) {
    return db.get('accounts').push(userSignup).write()
}

function initialiseDatabase() {
    db.defaults({ accounts: [] }).write()
}

exports.login = login
exports.usernameCheck = usernameCheck
exports.emailCheck = emailCheck
exports.writeToDatabase = writeToDatabase
exports.initialiseDatabase = initialiseDatabase
