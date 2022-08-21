import { START_TAG, END_TAG } from './consts.js'

export default function parse(md, fileName = 'md') {
  const lines = md.split('\n').map(l => l.trimEnd())
  const out = { sections: [] }
  let section = { title: '', lines: [], level: 0 },
    codeBlock,
    title,
    json,
    level,
    infoBlock = ''
  const topSection = section
  const checkInfoDone = lineNum => {}

  lines.forEach((line, i) => {
    const lineNum = i + 1
    const trimmed = line.trim()

    if (line[0] === '#') {
      level = 1
      while (line[level] === '#') level++
      title = line
      json = null

      section = { title, lines: [], level }

      out.sections.push(section)
    } else if (infoBlock || trimmed.startsWith(START_TAG)) {
      infoBlock += trimmed
      if (infoBlock.endsWith(END_TAG)) {
        try {
          const target = codeBlock || section || out
          target.info = JSON.parse(infoBlock.substring(1, infoBlock.length - 1))
        } catch (e) {
          throw new Error(`Error parsing section info at ${fileName}:${lineNum}. ${e.message}. ${infoBlock}`)
        } finally {
          infoBlock = ''
        }
      }
    } else if (section) {
      if (line.substring(0, 3) === '```') {
        if (codeBlock) {
          // end old code block
          if (line.substring(0, 3) === '```') {
            codeBlock = null
          } else {
            codeBlock.lines.push(line)
          }
        } else {
          // new code block
          title = line.substring(3).trim()
          const idx = title.indexOf(START_TAG)
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
        ;(codeBlock || section).lines.push(line)
      }
    } else {
      throw new Error('unhandled parser state')
    }
  })
  if (topSection.info) {
    out.info = topSection.info
    delete topSection.info
  }
  if (topSection.lines.length) out.sections.unshift(topSection)
  return out
}
