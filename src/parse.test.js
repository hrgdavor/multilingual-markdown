import test from 'ava'

import { default as parse } from './parse.js'
import { default as stringify } from './stringify.js'

test('simple section', t => {
  let obj, text
  t.deepEqual(
    (obj = parse(
      (text = `# section
bla bla
`),
    )),
    {
      sections: [
        {
          title: '# section',
          level: 1,
          lines: ['bla bla', ''],
        },
      ],
    },
  )

  t.deepEqual(stringify(obj), text)
})

test('simple section with json', t => {
  t.deepEqual(
    parse(`# section
({"uuid":"1234"})
bla bla
`),
    {
      sections: [
        {
          title: '# section',
          level: 1,
          info: { uuid: '1234' },
          lines: ['bla bla', ''],
        },
      ],
    },
  )
})

test('simple section with code block', t => {
  t.deepEqual(
    parse(`# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235"})
let x = 1
\`\`\`
`),
    {
      sections: [
        {
          title: '# section',
          level: 1,
          info: { uuid: '1234' },
          lines: [
            'bla bla',
            '',
            {
              code: 'js',
              info: { uuid: '1235' },
              lines: ['let x = 1'],
            },
            '',
          ],
        },
      ],
    },
  )
})

test('document options', t => {
  t.deepEqual(
    parse(`({"info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235"})
let x = 1
\`\`\`
`),
    {
      info: {
        info: 'compact',
      },
      sections: [
        {
          title: '',
          level: 0,
          lines: [''],
        },
        {
          title: '# section',
          level: 1,
          info: { uuid: '1234' },
          lines: [
            'bla bla',
            '',
            {
              code: 'js',
              info: { uuid: '1235' },
              lines: ['let x = 1'],
            },
            '',
          ],
        },
      ],
    },
  )
})

test('document options multiline', t => {
  t.deepEqual(
    parse(`({"
    info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"
uuid":"1235"
})
let x = 1
\`\`\`
`),
    {
      info: {
        info: 'compact',
      },
      sections: [
        {
          title: '',
          level: 0,
          lines: [''],
        },
        {
          title: '# section',
          level: 1,
          info: { uuid: '1234' },
          lines: [
            'bla bla',
            '',
            {
              code: 'js',
              info: { uuid: '1235' },
              lines: ['let x = 1'],
            },
            '',
          ],
        },
      ],
    },
  )
})
