var Botkit = require('botkit');
var request = require('request');
var controller = Botkit.slackbot();
var logger = require('bunyan').createLogger({ name: 'webtaskbot' });
var assert = require('assert');
[
'SLACK_TOKEN',
'WEBTASK_URL',
'WEBTASK_TOKEN'
].forEach(function (v) {
  assert.ok(process.env[v] !== undefined, v + ' environment variable not set.');
});
var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
});
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});
controller.hears(['run'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  logger.info('new webtask requested');
  var matches = message.text.replace(/`/g, "").match(/run:(.*)/i);
  if (!matches) {
    bot.reply(message, 'please, provide a code to run, eg: \nrun: `function(cb) { cb(null, \'Hello\'); }`');
    return;
  }
  var body = 'return ' + matches[1];
  request({
    method: 'POST',
    url: process.env.WEBTASK_URL,
    headers: {
      'Authorization': 'Bearer ' + process.env.WEBTASK_TOKEN
    },
    body: body,
    timeout: 10000
  }, function(error, res, body) {
    if (error) {
      logger.error(error, 'failed to execute webtask.');
      bot.reply(message, 'sorry, something went wrong, we\'re looking to it');
      return;
    }
    bot.reply(message, '```'+body+'```');
    return;
  });
});
