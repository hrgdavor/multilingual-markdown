import { default as UUID }  from './UUID.js'
import { default as sectionMd5 } from './sectionMd5.js'

export function init (options, mdObj) {
  doInit(options, UUID, () => Date.now(), mdObj)
}

export function initTrans({ codeSectionMeta }, mdObj) {
  const sections = [];

  mdObj.sections.forEach((s) => {
    const trans = { ...s };
    trans.info = { t: true, ...s.info, trans: 0 };
    sections.push(trans);
    sections.push(s);
  });

  return { ...mdObj, sections };
}

export function doInit(options, UUID, nowFunc, mdObj) {
  if (mdObj && mdObj.sections) {
    mdObj.sections.forEach((section) =>
      initSection(options, false, UUID, nowFunc, section)
    );
  }

  return mdObj;
}

function initSection (options, isCode, UUID, nowFunc, section) {
  if (section && section.lines) {
    section.lines.forEach(line => {
      if (typeof line !== 'string') { initSection( options, true, UUID, nowFunc, line) }
    })
    let { codeSectionMeta } = options

    if(!isCode || codeSectionMeta ){
      const info = section.info = section.info || {}
      if (!info.ts) info.ts = nowFunc()
      if (!info.id) info.id = UUID()
      if (!info.h) info.h = sectionMd5(section)
      if (!('trans' in info)) info.trans = -1
    }
  }

  return section
}
