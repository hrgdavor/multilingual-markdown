

function stringify(mdObj, fileName='md'){
	return toLines(mdObj,[]).join('\n')
}

function toLines(obj, out=[]){
	if(obj instanceof Array){
		obj.forEach(line=>{
			if(typeof line == 'string')
				out.push(line)
			else
				toLines(line, out)
		})
	}else if(obj.sections){
		obj.sections.forEach(section=>toLines(section,out))
	}else if(obj.title){
		let title  = obj.title
		if(obj.info) title += ' {'+JSON.stringify(obj.info)+'}'
		out.push(title)
		toLines(obj.lines, out)
	}else{ // code
		let code = '```'
		if(obj.code) code += obj.code
		if(obj.info) code += ' {'+JSON.stringify(obj.info)+'}'
		out.push(code)
		toLines(obj.lines, out)
		out.push('```')
	}

	return out
}

stringify.toLines = toLines

module.exports = stringify