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

  const e = getTestData();
  const logger = new Logger();
  const outputApiFactory = new OutputApiFactory(logger);
  const outputApiConsole = outputApiFactory.create('consle');

  // TODO: local共通項をまとめる
  const slackBot = new SlackBot(new Json(e), outputApiConsole, config, logger);
  slackBot.run();

  console.log(logger.getAll());
};

var getTestData = () => {
  return {
    "parameter": {
      "payload": JSON.stringify({
        "type": "block_actions",
        "team": {
          "id": "TM5UST2TF",
          "domain": "jollygopher"
        },
        "user": {
          "id": "ULUFYLUBD",
          "username": "nkitgamesake",
          "name": "nkitgamesake",
          "team_id": "TM5UST2TF"
        },
        "api_app_id": "AUZD64JB0",
        "token": "bqojDfEEGHFv0J1RUbGBaTfY",
        "container": {
          "type": "message",
          "message_ts": "1584610581.000200",
          "channel_id": "CMP01787L",
          "is_ephemeral": true
        },
        "trigger_id": "1001164542417.719978920933.ee5c8b740546759688b475b66fdaf16a",
        "channel": {
          "id": "CMP01787L",
          "name": "bot_practice"
        },
        "response_url": "https://hooks.slack.com/actions/TM5UST2TF/1011231051792/2cEzlUyV5sVoGt4uR0dQugRP",
        "actions": [
          {
            "action_id": "do_you_go_to_gym",
            "block_id": "8VhS",
            "text": {
              "type": "plain_text",
              "text": "行った:バンザイ:！",
              "emoji": true
            },
            "value": "yes",
            "type": "button",
            "action_ts": "1584610585.922334"
          }
        ]
      })
    }
  }
};

main();
