
function parse (md, fileName = 'md') {
  const lines = md.split('\n').map(l => l.trimEnd())
  const out = { sections: [] }
  let section, codeBlock, title, json, level

  lines.forEach((line, i) => {
    const lineNum = i + 1

    if (line[0] === '#') {
      level = 1
      while (line[level] === '#') level++
      title = line
      json = null

      const idx = line.indexOf('{{')
      if (idx !== -1) {
        json = line.substring(idx + 1, line.length - 1)
        title = line.substring(0, idx).trim()
      }
      section = { title, lines: [], level }
      try {
        if (json) section.info = JSON.parse(json)
      } catch (e) {
        throw new Error(`Error parsing section info at ${fileName}:${lineNum}. ${e.message}. ${line}`)
      }
      out.sections.push(section)
    } else if (section) {
      if (line.substring(0, 3) === '```') {
        if (codeBlock) {
          // end old code block
          if (line.substring(0, 3) === '```') { codeBlock = null } else { codeBlock.lines.push(line) }
        } else {
          // new code block
          title = line.substring(3).trim()
          const idx = title.indexOf('{{')
          if (idx !== -1) {
            json = title.substring(idx + 1, title.length - 1)
            title = title.substring(0, idx).trim()
          }
          codeBlock = { code: title, lines: [] }
          try {
            if (json) codeBlock.info = JSON.parse(json)
          } catch (e) {
            throw new Error(`Error parsing code-block info at ${fileName}:${lineNum}. ${e.message}. ${line}`)
          }
          section.lines.push(codeBlock)
        }
      } else {
        (codeBlock || section).lines.push(line)
      }
    } else {
      throw new Error('unhandled parser state')
    }
  })
  return out
}

module.exports = parse
