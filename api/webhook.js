'use strict'

const crypto = require('crypto')
const Twitter = require('twitter')

const secretGitHub = process.env.GITHUB_SECRET

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
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

const tweetIssue = (req) => {
  const { html_url: htmlUrl, title } = req.body.issue
  const tweet = { status: `${title}\n${htmlUrl}` }
  twitter.post('statuses/update', tweet, (err, tweet, response) => {
    if (err) return console.log('Error posting on twitter:', err)
    console.log('Tweet ok!')
  })
  return tweet
}

const isOpenedIssue = (req) => req.body.action === 'opened'
const isProduction = (env) => (
  env === 'production' || process.env.NODE_ENV === 'production'
)

module.exports = (req, res) => {
  if (!isOpenedIssue(req) || !isGitHubSignatureValid(req)) {
    console.log('error:', req.body.action)
    throw new Error('It is not an opened issue or the signature is invalid')
  }

  if (isProduction()) {
    const tweet = tweetIssue(req)
    console.log('tweet:', tweet.status)
  }

  console.log('well done!')
  res.send('<3')
}
