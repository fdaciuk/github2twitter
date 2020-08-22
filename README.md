# GitHub to Twitter

> Send informations from GitHub to Twitter

## Before run

**Create a webhook on GitHub:**

Choose a repository on GitHub that you want to read issues to post on Twitter. Enter on **Settings** and configure a new webhook.

To test webhook locally and set a URL on GitHub, we recomend you to use [ngrok](https://ngrok.com/)

**Create an app on Twitter:**

Create a new app on https://apps.twitter.com/, and configure to read and write.

**Environment Variables:**

Create a copy of the file `.env.example` called `.env`. Then, just configure some environment variables inside this file:

- `PORT`: Port to run the server. Default is `8080`
- `GITHUB_SECRET`: GitHub secret on webhook configuration
- `CONSUMER_KEY`: Twitter Consumer Key
- `CONSUMER_SECRET`: Twitter Consumer Secret
- `ACCESS_TOKEN_KEY`: Twitter Access Token Key
- `ACCESS_TOKEN_SECRET`: Twitter Access Token Secret

## Default configurations

- `/api/webhook` is the route to configure on GitHub app
- `/api/tweet` is the route to configure as callback on Twitter app

## Scripts

- `yarn dev`: Run local dev server

## Notes

It will just tweet on production environment. To force tweet on development environment, edit `index.js`, on line `59`, and pass `'production'` by parameter for `isProduction` function.

## Deploy

This repository is ready to run inside Heroku.

## License

[MIT License](LICENSE)
