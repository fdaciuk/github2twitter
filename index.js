'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')
const app = express()
const port = process.env.PORT
const path = process.env.PATH
const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post(path, (req, res, next) => {
  if (req.body.action !== 'opened') {
    return next('Is no opened issue')
  }

  const { html_url, title } = req.body.issue
  const status = { status: `${title}\n${html_url}` }
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
  res.send('</3')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
