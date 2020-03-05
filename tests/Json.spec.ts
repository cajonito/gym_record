import { Json } from '../src/Json';

test('get', () => {
  let json: Json
  json = new Json({
    'a': 'A',
    'b': {
      'c': 'C',
      'd': [
        {
          'e': 'E',
          'f': 'f'
        },
        {
          'g': 'G',
          'h': [
            'i',
            'j',
            ['k', 'l', 'm']
          ]
        }
      ]
    }
  })

  expect(json.get('b.d.1.h.2.1')).toBe('l');
  expect(json.get('c')).toBe(undefined);
  expect(json.get('b.d.100.h.2.1')).toBe(undefined);
  expect(json.get('.....')).toBe(undefined);

  json = new Json({});
  expect(json.get('some_key')).toBe(undefined);
});