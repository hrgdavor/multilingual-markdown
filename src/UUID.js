const nodejsVariant = () => {
  const [a, b] = process.hrtime()
  return Math.round((a * 1000) + (b / 1000000))
}

export default function() {
  let d = Date.now()
  // eslint-disable-next-line
  let d2 = (typeof performance !== 'undefined' && performance.now && (performance.now() * 1000)) || nodejsVariant()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
}
