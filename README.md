# GitHub to Twitter

> Send informations from GitHub to Twitter

## Before run

**Create a webhook on GitHub:**

Choose a repository on GitHub that you want to read issues to post on Twitter. Enter on **Settings** and configure a new webhook.

**Create an app on Twitter:**

Create a new app on https://apps.twitter.com/, and configure to read and write.

**Configure some environment variables:**

- `PORT`: Port to run the server. Default is `8080`
- `APP_PATH`: Path to GitHub send the webhook. Default is `/webhook`
- `GITHUB_SECRET`: GitHub secret on webhook configuration
- `CONSUMER_KEY`: Twitter Consumer Key
- `CONSUMER_SECRET`: Twitter Consumer Secret
- `ACCESS_TOKEN_KEY`: Twitter Access Token Key
- `ACCESS_TOKEN_SECRET`: Twitter Access Token Secret

## Scripts

- `npm run watch`: Run local dev server
- `npm run deploy`: Deploy to [`now`](https://zeit.co/now)

## License

[MIT License](LICENSE)
