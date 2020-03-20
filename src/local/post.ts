import { SlackBot } from '../SlackBot';
import { OutputApiFactory } from '../OutputApiFactory';
import { Console } from '../CalendarApi/Console';
import { Json } from '../Json';
import { Config } from '../Config'
import { Logger } from '../Logger'
import { Google } from '../CalendarApi/Google';

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
  const calendarApi = new Google(logger);

  const slackBot = new SlackBot(new Json(e), outputApiConsole, calendarApi, config, logger);
  slackBot.run();
};

var getTestData = () => {
  const fs = require('fs');
  let contents = fs.readFileSync('./tests/data/mention.json');

  return {
    parameter: {},
    contextPath: '',
    contentLength: 0, //dummy
    queryString: '',
    parameters: {},
    postData: {
      type: 'application/json',
      length: 0, //dummy
      contents: JSON.stringify(JSON.parse(contents)),
      name: 'postData'
    }
  };
};

main();
