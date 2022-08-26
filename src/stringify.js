export default function stringify(mdObj, fileName = 'md', skipInfo, skipHidden) {
  return toLines(mdObj, [], skipInfo).join('\n')
}

function stringifyInfo(info) {
  return `(${JSON.stringify(info)})`
}

function toLines(obj, out = [], skipInfo, skipHidden) {
  const pushInfo = () => {
    if (!skipInfo && obj.info) out.push(stringifyInfo(obj.info))
  }
  if (obj instanceof Array) {
    obj.forEach(line => {
      if (typeof line === 'string') {
        out.push(line)
      } else {
        toLines(line, out, skipHidden)
      }
    })
  } else if (!(skipHidden && obj.info?.hidden)) {
    if (obj.sections) {
      pushInfo()
      obj.sections.forEach(section => toLines(section, out, skipHidden))
    } else if (obj.title !== undefined) {
      let title = obj.title
      if (obj.level) out.push(title)
      pushInfo()
      toLines(obj.lines, out, skipHidden)
    } else {
      // code
      let code = '```'
      if (obj.code) code += obj.code
      out.push(code)
      pushInfo()
      toLines(obj.lines, out, skipHidden)
      out.push('```')
    }
  }

  return out
}

stringify.toLines = toLines
