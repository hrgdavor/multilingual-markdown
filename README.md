# multilingual-markdown (mulmd)

Editor and CLI(called mulmd) for maintaining a set of multilingual markdown(.md) files

currenty testing [editor prototype](https://hrgdavor.github.io/multilingual-markdown/editor/translator.edit.html)

Started as an idea from a [discussion](https://github.com/ryul1206/multilingual-markdown/discussions/8) .

# TODO for intital release
general
 - [x] define inital format
 - [x] LIB: hashing rules 
 - [x] LIB: uuid lib / func
 - [x] LIB: choose hash - MD5(cross platform and cross language) not for security, it is just helping detect changes in text
 - [x] create node project (package.json)
 - [x] CLI: create script with UUID and md5 included [cli tutorial used](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs)
 - [x] LIB: setup first test (test sample text and md5 of it)
 - [x] LIB: sections parse - read md into obj model
 - [x] LIB: sections stringify - write md from obj model
 - [x] Editor: basic edit base file (drag and drop 1 file) sections outline, click to edit title and text separately one section at the time
 - [x] LIB: initialize sections (add uuids and hashes)
 - [x] Editor: publish as github page (docs folder) [test version](https://hrgdavor.github.io/multilingual-markdown/editor/translator.edit.html)
 - [x] CLI: initialize base file (add uuids and hashes) `mulmd init docs/editor/parameters.md`
 - [x] Editor: initialize base file (add uuids and hashes)
 - [ ] CLI: generate file for transaltion from base file
 - [ ] Editor: basic edit translation file (drag and drop 2 files) 
 - [ ] Editor: edit translation file: with diff of changes in base file (drag and drop 2 files) 
 - [ ] CLI: sync translation by injecting missing sections
 - [ ] Editor: sync translation by injecting missing sections
 - [ ] CLI-pre-commit-hook: script spacification so it can be used to block unfinished edits
 - [ ] CLI: allow automatic pushing code-block changes across translations (if it was unchanged in the translation)
 - [ ] Editor: allow automatic pushing code-block changes across translations (if it was unchanged in the translation)
 - [ ] CLI-info: specification of the script (options and actions and infos that it can give)
 - [ ] CLI-info: xxx
 - [ ] CLI-info: yyy

## maybe future
 - [ ] CLI: lint code sections (or standardx) ... have them included and linted separetely
 - [ ] Editor: lint code sections
 - [ ] use git to compare current file edited with latest `git show HEAD:./filename.txt`

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
## translations inside code

There is already similar use case for [footnotes](https://www.markdownguide.org/extended-syntax/#footnotes) in general

 - use footnote syntax inside code blocks by placing a footnote reference `[^1]`,`[^2]`,...
 - code block is then same for all languages and can safely be updated in an automated task across translations
 - translation is placed as footnote
 - this is mainly meant for comments, but may be even ok to use inside strings
 - when exporting md files one can move translations back to code block and remove from text body
 - if there is legitimate code inside code-block that would be mistaken for footnote syntax, one could then enforce a prefix for these translation footnotes that would then prevent the conflict with the code

example code block and translation as footnote later

```
|```js {{"id":"UUID", "h":"md5"}}
|  function code(){// [^1]
|```
|
|[^1]: Comment for the function that can be translated without changing the code
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
 - lines: timrEnd (trimRight)
 - emtpy lines removed at the end .... (not sure about this one)


