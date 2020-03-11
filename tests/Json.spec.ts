import { Json } from '../src/Json';

test('get', () => {
  let json: Json

  // ルートがObjectの場合
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

  // 引数無しだとルートを取得する
  json = new Json({
    'a': {
      'b': 'B'
    }
  })
  expect(json.get()).toStrictEqual({
    'a': {
      'b': 'B'
    }
  })

  // ルートが配列の場合
  json = new Json([1, 2, 3])
  expect(json.get('0')).toBe(1);
  expect(json.get()).toStrictEqual([1, 2, 3]);

  // 異常系
  json = new Json({});
  expect(json.get('some_key')).toBe(undefined);
});