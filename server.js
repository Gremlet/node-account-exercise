const express = require('express')
const port = 8080
const { initialiseDatabase } = require('./dbHandlers')

const accountRouter = require('./routes/index')

const app = express()

app.use(express.json())
app.use('/api', accountRouter)
app.use(express.static('frontend'))

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
    initialiseDatabase
})
