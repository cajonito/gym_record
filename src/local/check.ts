import { SlackBot } from '../SlackBot';
import { Check } from '../Action/Check';
import { OutputApiFactory } from '../OutputApiFactory';
import { Json } from '../Json';
import { Config } from '../Config'
import { Logger } from '../Logger'

var main = () => {
  const config: Config = {
    'channelId': 'channel_id',
    'debugChannelId': 'debug_channel_id',
    'token': 'token'
  }

  const outputApiFactory = new OutputApiFactory();
  const outputApiConsole = outputApiFactory.create('consle');
  const e = getTestData();
  const logger = new Logger();
  // TODO: local共通項をまとめる
  const slackBot = new SlackBot(new Json(e), outputApiConsole, config, logger);
  slackBot.run();

  console.log(logger.getAll());
};

var getTestData = () => {
  return {
    'trigger': Check.TRIGGER_ID_CHECK,
    'user_id': 'SOME_USER_ID'
  }
};

main();
