const res = await fetch('https://www.behance.net/abulhaabdulla', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
})
const html = await res.text()

const projectLinks = [...new Set([...html.matchAll(/https:\/\/www\.behance\.net\/gallery\/\d+\/[^"'\\]+/g)].map((m) => m[0]))]
const slugLinks = [...new Set([...html.matchAll(/href="(\/gallery\/\d+\/[^"]+)"/g)].map((m) => 'https://www.behance.net' + m[1]))]
const nextData = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)

console.log('projectLinks', projectLinks.slice(0, 15))
console.log('slugLinks', slugLinks.slice(0, 15))

if (nextData) {
  const data = JSON.parse(nextData[1])
  const str = JSON.stringify(data)
  const thumbs = [...str.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/[^"\\]+/g)].map((m) => m[0])
  console.log('next thumbs', [...new Set(thumbs)].slice(0, 15))
  const names = [...str.matchAll(/"name":"([^"]{5,80})"/g)].map((m) => m[1]).filter((n) => !n.includes('\\'))
  console.log('names sample', [...new Set(names)].slice(0, 20))
}
