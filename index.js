'use strict'

const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')

const app = express()
const port = process.env.APP_PORT || 8080
const path = process.env.APP_PATH || '/webhook'
const secretGitHub = process.env.GITHUB_SECRET

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const createSignature = (key, body) => (
  'sha1=' + crypto
    .createHmac('sha1', key)
    .update(JSON.stringify(body))
    .digest('hex')
)

const isGitHubSignatureValid = (req) => {
  const signature = createSignature(secretGitHub, req.body)
  return req.headers['x-hub-signature'] === signature
}

const tweetIssue = (req, next) => {
  const { html_url: htmlUrl, title } = req.body.issue
  const tweet = { status: `${title}\n${htmlUrl}` }
  twitter.post('statuses/update', tweet, (err, tweet, response) => {
    if (err) return next(err)
    console.log('Tweet ok!')
  })
  return tweet
}

const isOpenedIssue = (req) => req.body.action === 'opened'
const isProduction = (env) => (
  env === 'production' || process.env.NODE_ENV === 'production'
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('It works <3')
})

app.post(path, (req, res, next) => {
  if (!isOpenedIssue(req) || !isGitHubSignatureValid(req)) {
    return next('It is not an opened issue or the signature is invalid')
  }

  if (isProduction()) {
    const tweet = tweetIssue(req, next)
    console.log('tweet:', tweet.status)
  }

  console.log('well done!')
  res.send('<3')
})

app.get('/tweet', (req, res) => {
  console.log('twitter callback url:', req.body)
  res.send('twitter callback url')
})

app.all((req, res) => {
  console.log(`not on ${path}`)
  res.status(500).send('</3')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
