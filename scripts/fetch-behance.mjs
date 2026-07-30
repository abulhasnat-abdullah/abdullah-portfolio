const res = await fetch('https://www.behance.net/abulhaabdulla', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
})
const html = await res.text()

const imageUrls = [...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^"'\\]+/g)].map((m) => m[0])
const galleryIds = [...new Set([...html.matchAll(/\/gallery\/(\d+)/g)].map((m) => m[1]))]

console.log(JSON.stringify({ imageUrls: [...new Set(imageUrls)].slice(0, 20), galleryIds: galleryIds.slice(0, 15) }, null, 2))
