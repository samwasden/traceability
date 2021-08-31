const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())
app.use('/css', express.static('./styles.css'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.info('success.')
})

const port = process.env.PORT || 4000

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`doing shit on port ${port}!`))