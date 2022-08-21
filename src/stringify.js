export default function stringify(mdObj, fileName = 'md') {
  return toLines(mdObj, []).join('\n')
}

function stringifyInfo(info) {
  return `(${JSON.stringify(info)})`
}

function toLines(obj, out = []) {
  if (obj instanceof Array) {
    obj.forEach(line => {
      if (typeof line === 'string') {
        out.push(line)
      } else {
        toLines(line, out)
      }
    })
  } else if (obj.sections) {
    if (obj.info) out.push(stringifyInfo(obj.info))
    obj.sections.forEach(section => toLines(section, out))
  } else if (obj.title !== undefined) {
    let title = obj.title
    if (obj.level) out.push(title)
    if (obj.info) out.push(stringifyInfo(obj.info))
    toLines(obj.lines, out)
  } else {
    // code
    let code = '```'
    if (obj.code) code += obj.code
    out.push(code)
    if (obj.info) out.push(stringifyInfo(obj.info))
    toLines(obj.lines, out)
    out.push('```')
  }

  return out
}

stringify.toLines = toLines
