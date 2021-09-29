#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const UUID = require('../src/UUID.js')
const md5 = require('../src/md5.js')
const init = require('../src/init.js')
const parse = require('../src/parse.js')
const stringify = require('../src/stringify.js')

const argv = process.argv.slice(2)

// console.log(chalk.green('Hello! multilingual-markdown'))

// console.log(chalk.green('UUID'), UUID())
// console.log(chalk.green('md5 hello'), md5('hello'))


console.log('argv',argv)

if(!argv.length || argv[0] === '--help'){
	printHelp()
}else{
	let cmd = argv.shift()

	if(cmd === 'init'){
		doInit(argv)
	} 
}


function printHelp(){
console.log(`
mulmd {command} [params...]

mulmd init fileName

`);	
}


function doInit(argv){
	if(argv[0]){
		let str = fs.readFileSync(argv[0]).toString()
		let mdObj = parse(str)
		init(mdObj)
		let out = stringify(mdObj)
		fs.writeFileSync(argv[0], out)
	}
}