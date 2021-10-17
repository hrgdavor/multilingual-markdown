const md5 = require('./md5')

function sectionMd5 (section) {
  const lines = [section.title || section.code || '']
  section.lines.forEach(line => {
    if (typeof line === 'string') { lines.push(line) }
  })
  return md5(lines.join('\n'))
}

module.exports = sectionMd5
