const test = require('ava')

const md5 = require('./md5')

test('md5 test sample text', (t) => {

	t.is(md5('test sample text'), '28c655aaf473032b693ab9385558e9d2')
})
