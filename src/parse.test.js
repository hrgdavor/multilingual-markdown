const test = require('ava')

const parse = require('./parse')
const stringify = require('./stringify')

test('simple section', (t) => {
	let obj,text
	t.deepEqual(obj=parse(text=`# section
bla bla
`), 
{sections:[
	{
		title:"# section",
		lines:[
			'bla bla',
			'',
		],
	}
]})

	t.deepEqual(stringify(obj),text)	
})


test('simple section with json', (t) => {
	t.deepEqual(obj=parse(text=`# section {{"uuid":"1234"}}
bla bla
`), 
{sections:[
	{
		title:"# section",
		info: {"uuid":"1234"},
		lines:[
			'bla bla',
			'',
		],
	}
]})
})


test('simple section with code block', (t) => {
	t.deepEqual(obj=parse(text=`# section {{"uuid":"1234"}}
bla bla

\`\`\`js {{"uuid":"1235"}}
let x = 1
\`\`\`
`), 
{sections:[
	{
		title:"# section",
		info: {"uuid":"1234"},
		lines:[
			'bla bla',
			'',
			{code:'js', info:{"uuid":"1235"},
				lines:[
					'let x = 1'
				]
			},
			'',
		],
	}
]})
})


