import { SlackBot } from '../SlackBot';
import { Check } from '../Action/Check';
import { OutputApiFactory } from '../OutputApiFactory';
import { Json } from '../Json';
import { Config } from '../Config'

var main = () => {
  const config: Config = {
    'channelId': 'channel_id',
    'debugChannelId': 'debug_channel_id',
    'token': 'token'
  }

  const outputApiFactory = new OutputApiFactory();
  const outputApiConsole = outputApiFactory.create('consle');
  const e = getTestData();
  const slackBot = new SlackBot(new Json(e), outputApiConsole, config);
  slackBot.run();
};

var getTestData = () => {
  return {
    'trigger': Check.TRIGGER_ID_CHECK,
    'user_id': 'SOME_USER_ID'
  }
};

main();
