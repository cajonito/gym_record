import { GymDone } from '../../src/Action/GymDone';
import { Check } from '../../src/Action/Check';
import { Json } from '../../src/Json';
import { Console as OutputApi_Console } from '../../src/OutputApi/Console';
import { Console as CalendarApi_Console } from '../../src/CalendarApi/Console';
import { Config } from '../../src/Config'
import { Logger } from '../../src/Logger'

const TEST_CHANNEL_ID = 'channel_id';
const config: Config = {
  'channelId': TEST_CHANNEL_ID,
  'debugChannelId': null,
  'token': null,
}

const logger = new Logger();
const gymDone = new GymDone(new OutputApi_Console(logger), new CalendarApi_Console(logger), config, logger);
test('match', () => {
  expect(gymDone.match(new Json({
    'parameter': {
      'payload': JSON.stringify({
        'container': {
          'message_ts': '0123456789.0123456'
        },
        'actions': [
          {
            'action_id': Check.CHECK_BUTTON_ACTION_ID,
            'value': Check.CHECK_BUTTON_ACTION_VALUE
          }
        ]
      })
    }
  }))).toBe(true);

  expect(gymDone.match(new Json({}))).toBe(false);
})