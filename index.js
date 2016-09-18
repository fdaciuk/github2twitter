'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')
const app = express()
const port = process.env.APP_PORT || 8080
const path = process.env.APP_PATH || '/webhook'
const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('It works <3')
})

app.post(path, (req, res, next) => {
  if (req.body.action !== 'opened') {
    return next('It is no opened issue')
  }

  const { html_url: htmlUrl, title } = req.body.issue
  const status = { status: `${title}\n${htmlUrl}` }
  twitter.post('statuses/update', status, (err, tweet, response) => {
    if (err) return next(err)
    console.log('Tweet ok!')
    res.send('<3')
  })
})

app.get('/tweet', (req, res) => {
  console.log('req.body tweet:', req.body)
  res.send('twitter')
})

app.all((req, res) => {
  console.log(`not on ${path}`)
  res.status(500).send('</3')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
