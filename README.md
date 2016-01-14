# webtaskbot
A slack bot for running code on [webtask.io](https://webtask.io/)

![webtaskbot](http://i.giphy.com/3o6UBoCf4cvn58Z9ni.gif)


## Getting started
```
export SLACK_TOKEN=your_slack_token
export WEBTASK_URL=your_webtask_url
export WEBTASK_TOKEN=your_webtask_token
npm install
node main.js
```

Ready! to mention `@webtaskbot` with the JS code to run.

## Finding tokens & urls.

`SLACK_TOKEN`

1. `https://my.slack.com/services/new/bot`
2. Give a name to the bot then click on `Add Bot Integration`
3. You will see it `API Token`


`WEBTASK_URL` & `WEBTASK_TOKEN`

1. After installing [webtask-cli](https://webtask.io/cli)
2. Run: `more ~/.webtask`
3. You will see something like:
```
  {
    "default": {
      "url": "https://webtask.it.auth0.com",
      "container": "your_container_name",
      "token": "your_token",
      "hasCreated": true
    }
  }
```
 - From above copy url as `WEBTASK_URL` and token as `WEBTASK_TOKEN`



### License
MIT.
