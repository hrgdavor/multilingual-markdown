const test = require('ava')

const clean = require('./clean')

test('simple section', (t) => {
  t.deepEqual(clean(
    {
      sections: [
        {
          title: '# section',
          level: 1,
          info: { id: 'test-uuid1', ts: 1632822125000, h: 'e30de02eccf91367b0310f2814bb0d72' },
          lines: [
            'bla bla',
            ''
          ]
        }
      ]
    }),
  {
    sections: [
      {
        title: '# section',
        level: 1,
        lines: [
          'bla bla',
          ''
        ]
      }
    ]
  }
  )
})// end test
