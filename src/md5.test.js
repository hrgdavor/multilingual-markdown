import test from 'ava'

import { default as md5 } from './md5.js'

test('md5 test sample text', (t) => {
  t.is(md5('test sample text'), '28c655aaf473032b693ab9385558e9d2')
})
