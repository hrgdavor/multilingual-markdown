
export default function clean (mdObj) {
  return doClean(mdObj)
}

function doClean (obj) {
  if (obj instanceof Array) {
    return obj.map(doClean)
  } else if (typeof obj === 'object') {
    const out = { ...obj }

    if (out.info) delete out.info

    if (out.sections) out.sections = obj.sections.map(doClean)

    if (out.lines) out.lines = obj.lines.map(doClean)

    return out
  }
  return obj
}
