#!/usr/bin/env node

import { default as fs} from 'fs'
import { default as chalk } from 'chalk'
// import { default as UUID } from '../src/UUID.js'
// import { default as md5 } from '../src/md5.js'
import { init,initTrans } from '../src/init.js'
import { default as parse } from '../src/parse.js'
import { default as stringify } from '../src/stringify.js'
import {findUpSync} from 'find-up'

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
	}else if(cmd === 'info'){
		doInfo(argv)
	}else if(cmd === 'help'){
		doHelp(argv)
	}else{
		printHelp()
	}
}


function printHelp(){
console.log(chalk`
{yellow mulmd {green command} [params...]}

   {green init} - initialize a file (and optionaly a translation)
   {green info} - info about a file (also shows current options)

{yellow mulmd help {green command}}
{yellow mulmd --help {green command}}
   - get details for a command

`);	
}

function doHelp(argv){

function log(cmd,text){
	console.log('help: ***********************************    '+cmd+'    ***********************************');
	console.log(text);
}

if(argv[0] === 'init') log(argv[0], chalk`
{yellow mulmd {green init} fileName.md}
  - initialize a base file

{yellow mulmd {green init} fileName.md fileName.lang.md}
  - initialize a base file if needed and generate translation file with sections
  - can also be used to update translation when new sections are added to base
  - if any of the sections in the base file is not initialized, it will exit with error
`)

if(argv[0] === 'info') log(argv[0], chalk`

`)

}


function doInit(argv){
	if(argv[0]){
		let str = fs.readFileSync(argv[0]).toString()
		let mdObj = parse(str)
		init(mdObj)
		let out = stringify(mdObj)
		fs.writeFileSync(argv[0], out)

		if(argv[1] && argv[1] !== argv[0]){
			let mdObj2 = initTrans(mdObj)
			out = stringify(mdObj2)
			fs.writeFileSync(argv[1], out)
		}
	}
}

function doInfo(argv){
	console.log(getSettings(argv[0]))
}

function getSettings(cwd){
	let pjsonFile = findUpSync('package.json',{cwd}) 
	let config = {}
	if(pjsonFile){
		let data = fs.readFileSync(pjsonFile)
		data = data.toString('utf-8')
		
		// Remove a possible UTF-8 BOM (byte order marker) as this can lead to parse values when passed in to the JSON.parse.
	  if (data.charCodeAt(0) === 0xFEFF) data = data.slice(1);		

		try { 
			config = JSON.parse(data)
		}catch (e) { }
	}

	return {
		codeSectionMeta: true,
		...(config || {}).multilingualMarkdown
	}
}