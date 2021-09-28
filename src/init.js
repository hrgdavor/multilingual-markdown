const UUID = require('./UUID')
const sectionMd5 = require('./sectionMd5')

function init(mdObj){
	doInit(UUID, ()=>Date.now(),mdObj)
}

function doInit(UUID, nowFunc, mdObj){
	if(mdObj && mdObj.sections)
		mdObj.sections.forEach(section=>initSection(UUID, nowFunc, section))

	return mdObj
}

function initSection(UUID, nowFunc, section){
	if(section && section.lines){
		console.log('section',section);
		section.lines.forEach(line=>{
			if(typeof line !== 'string') 
				initSection(UUID, nowFunc, line)
		})

		let info = section.info = section.info || {}
		if(!info.ts) info.ts = nowFunc()
		if(!info.id) info.id = UUID()
		if(!info.h) info.h = sectionMd5(section)
	}

	return section
}

init.doInit = doInit

module.exports = init