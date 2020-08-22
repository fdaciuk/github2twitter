'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8080

const webhookRoute = require('./api/webhook')
const tweetRoute = require('./api/tweet')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('GitHub 2 Twitter!'))
app.post('/api/webhook', webhookRoute)
app.get('/api/tweet', tweetRoute)

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
