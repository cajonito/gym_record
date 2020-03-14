import { Debug } from '../../src/Action/Debug';
import { Json } from '../../src/Json';
import { Console } from '../../src/OutputApi/Console'
import { Config } from '../../src/Config'
import { Logger } from '../../src/Logger'

const TEST_CHANNEL_ID = 'channel_id';
const config: Config = {
  'channelId': TEST_CHANNEL_ID,
  'debugChannelId': null,
  'token': null,
}

const debug = new Debug(new Console, config, new Logger);
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