import { SlackBot } from '../SlackBot';
import { Check } from '../Action/Check';
import { OutputApiFactory } from '../OutputApiFactory';
import { Console } from '../CalendarApi/Console';
import { Json } from '../Json';
import { Config } from '../Config'
import { Logger } from '../Logger'

var main = () => {
  const config: Config = {
    'channelId': 'channel_id',
    'debugChannelId': 'debug_channel_id',
    'token': 'token'
  }

  const e = getTestData();
  const logger = new Logger();
  const outputApiFactory = new OutputApiFactory(logger);
  const outputApiConsole = outputApiFactory.create('consle');
  const calendarApi = new Console(logger);

  // TODO: local共通項をまとめる
  const slackBot = new SlackBot(new Json(e), outputApiConsole, calendarApi, config, logger);
  slackBot.run();
  if (logger.hasLogs()) {
    console.log(logger.getAll());
  }
};

var getTestData = () => {
  return {
    'trigger': Check.TRIGGER_ID_CHECK,
    'user_id': 'SOME_USER_ID'
  }
};

main();
