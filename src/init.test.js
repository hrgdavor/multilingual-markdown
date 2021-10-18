const test = require('ava')

const { doInit } = require('./init')

const makeUuidFunc = () => {
  let seq = 1
  return () => 'test-uuid' + (seq++)
}
const nowFunc = () => 1632822125000

test('simple section', (t) => {
  t.deepEqual(doInit({codeSectionMeta:true}, makeUuidFunc(), nowFunc,
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
    }),
  {
    sections: [
      {
        title: '# section',
        level: 1,
        info: { "trans":-1, id: 'test-uuid1', ts: 1632822125000, h: 'e30de02eccf91367b0310f2814bb0d72' },
        lines: [
          'bla bla',
          ''
        ]
      }
    ]
  }
  )
})// end test


test('code seftion with info', (t) => {
  t.deepEqual(doInit({codeSectionMeta:true}, makeUuidFunc(), nowFunc,
    {
      sections: [
        {
          title: '# section',
          level: 1,
          lines: [
            'bla bla',
            {
              code: 'js',
              level: 1,
              lines: [
                'bla bla',
                ''
              ]
            },
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
        info: { "trans":-1, id: 'test-uuid2', ts: 1632822125000, h: 'af94febe99cfefdaddbd7b2adedce7d1' },
        lines: [
          'bla bla',
            {
              code: 'js',
              level: 1,
              info: { "trans":-1, id: 'test-uuid1', ts: 1632822125000, h: 'e740d6415247a316dd599b82d63eca59' },
              lines: [
                'bla bla',
                ''
              ]
            },
          ''
        ]
      }
    ]
  }
  )
})// end test


test('code seftion WITHOUT info', (t) => {
  t.deepEqual(doInit({codeSectionMeta:false}, makeUuidFunc(), nowFunc,
    {
      sections: [
        {
          title: '# section',
          level: 1,
          lines: [
            'bla bla',
            {
              code: 'js',
              level: 1,
              lines: [
                'bla bla',
                ''
              ]
            },
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
        info: { "trans":-1, id: 'test-uuid1', ts: 1632822125000, h: 'af94febe99cfefdaddbd7b2adedce7d1' },
        lines: [
          'bla bla',
            {
              code: 'js',
              level: 1,
              lines: [
                'bla bla',
                ''
              ]
            },
          ''
        ]
      }
    ]
  }
  )
})// end test