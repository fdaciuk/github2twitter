'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const webhookRoute = require('./api/webhook')
const tweetRoute = require('./api/tweet')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/webhook', webhookRoute)
app.get('/api/tweet', tweetRoute)

app.listen(8080, () => console.log('Listening on localhost:8080'))
