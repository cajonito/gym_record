import { Check } from '../../src/Action/Check';
import { Json } from '../../src/Json';
import { Console } from '../../src/OutputApi/Console'
import { Config } from '../../src/Config'
import { Logger } from '../../src/Logger';

const TEST_CHANNEL_ID = 'channel_id';
const config: Config = {
  'channelId': TEST_CHANNEL_ID,
  'debugChannelId': null,
  'token': null,
}

const logger = new Logger();
const check = new Check(new Console(logger), config, logger);

test('match', () => {
  expect(check.match(new Json({
    'trigger': Check.TRIGGER_ID_CHECK,
    'user_id': 'SUM_USER_ID'
  }))).toBe(true);

  expect(check.match(new Json({}))).toBe(false);
})