import test from 'ava'

import { default as parse } from './parse.js'
import { default as stringify } from './stringify.js'

test('simple section', t => {
  const md = `# section
({"uuid":"1234"})
bla bla

`
  const out = `# section
({"uuid":"1234"})
bla bla

`
  t.deepEqual(stringify(parse(md)), out)
})

test('document options', t => {
  const md = `({"info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235"})
let x = 1
\`\`\`
`
  const out = `({"info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235"})
let x = 1
\`\`\`
`
  t.deepEqual(stringify(parse(md)), out)
})

test('document skipinfo ', t => {
  const md = `({"info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235"})
let x = 1
\`\`\`
`
  const out = `
# section
bla bla

\`\`\`js
let x = 1
\`\`\`
`
  t.deepEqual(stringify(parse(md), '', true), out)
})

test('document skipinfo and hidden', t => {
  const md = `({"info":"compact"})

# section
({"uuid":"1234"})
bla bla

\`\`\`js
({"uuid":"1235","hidden":true})
let x = 1
\`\`\`
`
  const out = `
# section
bla bla

`
  t.deepEqual(stringify(parse(md), '', true, true), out)
})
