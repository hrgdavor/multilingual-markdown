const test = require('ava')

const { init, doInit } = require('./init')

const makeUuidFunc = ()=>{
	let seq = 1
	return ()=>'test-uuid'+(seq++)
}
const nowFunc = ()=>1632822125000


test('simple section', (t) => {
	t.deepEqual(doInit(makeUuidFunc(),nowFunc, 
{sections:[
	{
		title:"# section",
		level: 1,
		lines:[
			'bla bla',
			'',
		],
	}
]}),
{sections:[
	{
		title:"# section",
		level: 1,
		info: {id:'test-uuid1', ts:1632822125000, h:'e30de02eccf91367b0310f2814bb0d72'},
		lines:[
			'bla bla',
			'',
		],
	}
]}
)

})// end test


