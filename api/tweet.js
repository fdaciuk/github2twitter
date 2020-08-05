'use strict'

module.exports = (req, res) => {
  console.log('twitter callback url:', req.body)
  res.send('twitter callback url')
}

