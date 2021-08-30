#!/usr/bin/env node

const chalk = require('chalk')
const UUID = require('../src/UUID.js')
const md5 = require('../src/md5.js')

console.log(chalk.green('Hello! multilingual-markdown'))

console.log(chalk.green('UUID'), UUID())
console.log(chalk.green('md5 hello'), md5('hello'))
