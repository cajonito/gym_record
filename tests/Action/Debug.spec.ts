import { Debug } from '../../src/Action/Debug';
import { Json } from '../../src/Json';
import { Console as OutputApi_Console } from '../../src/OutputApi/Console';
import { Console as CalendarApi_Console } from '../../src/CalendarApi/Console';
import { Config } from '../../src/Config';
import { Logger } from '../../src/Logger';

const TEST_CHANNEL_ID = 'channel_id';
const config: Config = {
  'channelId': TEST_CHANNEL_ID,
  'debugChannelId': null,
  'token': null,
}

const logger = new Logger();
const debug = new Debug(new OutputApi_Console(logger), new CalendarApi_Console(logger), config, logger);
test('match', () => {
  expect(debug.match(new Json({
    'parameter': {
      'payload': JSON.stringify({
        'channel': {
          'id': TEST_CHANNEL_ID
        }
      })
    }
  }))).toBe(true);

  expect(debug.match(new Json({
    'postData': {
      'contents': JSON.stringify({
        'event': {
          'channel': TEST_CHANNEL_ID
        }
      })
    }
  }))).toBe(true);

  expect(debug.match(new Json({}))).toBe(false);
})