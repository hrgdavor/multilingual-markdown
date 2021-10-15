#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const UUID = require('../src/UUID.js')
const md5 = require('../src/md5.js')
const init = require('../src/init.js')
const parse = require('../src/parse.js')
const stringify = require('../src/stringify.js')

const argv = process.argv.slice(2)

if(!argv.length || argv[0] === '--help'){
	argv.shift()
	if(argv[0])
		doHelp(argv)
	else
		printHelp()
}else{
	let cmd = argv.shift()

	if(cmd === 'init'){
		doInit(argv)
	} 

	if(cmd === 'help'){
		doHelp(argv)
	} 
}


function printHelp(){
console.log(chalk`
{yellow mulmd {green command} [params...]}

   {green init} - initialize a file (and optionaly a translation)

{yellow mulmd help {green command}}
{yellow mulmd --help {green command}}
   - get details for a command

`);	
}

function doHelp(argv){

if(argv[0] === 'init') console.log(chalk`
{yellow mulmd {green init} fileName.md}
  - initialize a base file

{yellow mulmd {green init} fileName.md fileName.lang.md}
  - initialize a base file if needed and generate translation file with sections
  - can also be used to update translation when new sections are added to base

`);	


}


function doInit(argv){
	if(argv[0]){
		let str = fs.readFileSync(argv[0]).toString()
		let mdObj = parse(str)
		init(mdObj)
		let out = stringify(mdObj)
		fs.writeFileSync(argv[0], out)

		if(argv[1] && argv[1] !== argv[0]){
			let sections = []
			mdObj.sections.forEach(s=>{
				let trans = {...s}
				trans.info = {t:true, ...s.info}
				sections.push(trans)
				sections.push(s)
			})
			let mdObj2 = {...mdObj, sections}

			out = stringify(mdObj2)
			fs.writeFileSync(argv[1], out)
		}
	}
}