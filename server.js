const express = require('express')
const lowdb = require('lowdb')
const port = 8080
const FileSync = require('lowdb/adapters/FileSync')
const { initialiseDatabase } = require('./dbHandlers')
const adapter = new FileSync('accounts.json')

const accountRouter = require('./routes/index')

const db = lowdb(adapter)

const app = express()

app.use(express.json())
app.use('/api', accountRouter)
app.use(express.static('frontend'))

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
    initialiseDatabase
})
