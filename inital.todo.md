# TODO for intital release
general
 - [x] define inital format
 - [x] LIB: hashing rules 
 - [x] LIB: uuid lib / func
 - [x] LIB: choose hash - MD5(cross platform and cross language) not for security, it is just helping detect changes in text
 - [x] create node project (package.json)
 - [x] CLI: create script with UUID and md5 included [cli tutorial used](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs)
 - [x] LIB: setup first test (test sample text and md5 of it)
 - [ ] LIB: sections decoder - read md into obj model
 - [ ] LIB: sections encoder - write md from obj model
 - [ ] Editor: basic edit base file (drag and drop 1 file) sections outline, click to edit title and text separately one section at the time
 - [ ] Editor: basic edit translation file (drag and drop 2 files) 
 - [ ] Editor: edit translation file: with diff of changes in base file (drag and drop 2 files) 
 - [ ] LIB: initialize base file (add uuids and hashes)
 - [ ] CLI: initialize base file (add uuids and hashes)
 - [ ] Editor: initialize base file (add uuids and hashes)
 - [ ] CLI: generate file for transaltion from base file
 - [ ] CLI: sync translation by injecting missing sections
 - [ ] Editor: sync translation by injecting missing sections
 - [ ] CLI-info: script specification (options and actions and infos that it can give)
 - [ ] CLI-pre-commit-hook: script spacification so it can be used to block unfinished edits
 - [ ] use git to compare current file edited with latest `git show HEAD:./filename.txt`
 - [ ] Editor: publish as github page (docs folder)
 - [ ] CLI: allow automatic pushing code-block changes across translations (if it was unchanged in the translation)
 - [ ] Editor: allow automatic pushing code-block changes across translations (if it was unchanged in the translation)
 - [ ] CLI: lint code sections (or standardx) ... have them included and linted separetely
 - [ ] Editor: lint code sections

## format
General format is defined by JSON string injected at the end of each heading, additional brackets are added for less chance of conflict with heading title
 - `id` - id of the section in the original text
 - `h` - md5 checksum of the text
 - `ts` - timestamp when hash was generated and the hashed text id bound to the hash
 - `tid` - in translations it signifies the section is a translation, and value points to `id` of original text
 - `status` - empty/ommited when everything is ok, any other value means something needs to be done (`checkGrammar`,`approve`,`in progress`)

Other utilities may inject more properties in the JSON, so editor should not  clear them.

Base file contains the original text
```
# Main tile {{"id":"UUID", "h":"md5"}}
some text.

## subtitle {{"id":"UUID", "h":"md5"}}
subtitle text etc

## subtitle2 {works also if I use brackets in title} {{"id":"UUID", "h":"md5"}}
subtitle2 text etc
```

UUID and hash is also generated for code sections
```
|```js {{"id":"UUID", "h":"md5"}}
|  function code(){...
|```
```


when translation file is created, hash:"" to mark not yet translated.


## hashing rules
 - section title JSON data removed before hashing
 - code-block JSON data removed before hashing
 - lines trimmed
 - emtpy lines removed 

