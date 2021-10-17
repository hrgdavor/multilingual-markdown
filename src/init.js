const UUID = require('./UUID')
const sectionMd5 = require('./sectionMd5')

function init (mdObj) {
  doInit(UUID, () => Date.now(), mdObj)
}

function initTrans (mdObj) {
  const sections = []

  mdObj.sections.forEach(s => {
    const trans = { ...s }
    trans.info = { t: true, ...s.info }
    sections.push(trans)
    sections.push(s)
  })

  return { ...mdObj, sections }
}

function doInit (UUID, nowFunc, mdObj) {
  if (mdObj && mdObj.sections) { mdObj.sections.forEach(section => initSection(UUID, nowFunc, section)) }

  return mdObj
}

function initSection (UUID, nowFunc, section) {
  if (section && section.lines) {
    section.lines.forEach(line => {
      if (typeof line !== 'string') { initSection(UUID, nowFunc, line) }
    })

    const info = section.info = section.info || {}
    if (!info.ts) info.ts = nowFunc()
    if (!info.id) info.id = UUID()
    if (!info.h) info.h = sectionMd5(section)
  }

  return section
}

module.exports = { init, doInit, initTrans }
