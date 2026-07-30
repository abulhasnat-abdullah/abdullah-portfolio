const slugLinks = [
  'https://www.behance.net/gallery/242777209/BUET-ROBO-CARNIVAL-2026-Banner-and-poster-designs',
  'https://www.behance.net/gallery/123000689/PaintOff-Event-Banner',
  'https://www.behance.net/gallery/223586801/Specturm-Season-2-Social-Media-Event',
  'https://www.behance.net/gallery/223583681/Recruitment-Poster-BUET-Automobile-Club',
  'https://www.behance.net/gallery/133800931/Victory-Day-Poster-Designs',
  'https://www.behance.net/gallery/119244255/Salvador-Dalis-117th-Birthday-CAROUSEL',
  'https://www.behance.net/gallery/123000507/Paint-Your-Way-to-Glory-Event-Banner',
  'https://www.behance.net/gallery/211481715/Cover-Design-BUET-MECHA-22',
]

const projects = []

for (const url of slugLinks) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  })
  const html = await res.text()
  const title = html.match(/property="og:title" content="([^"]+)"/)?.[1] ?? html.match(/<title>([^<]+)<\/title>/)?.[1]
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1]
  const images = [...new Set([...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^"'\\]+/g)].map((m) => m[0]))]
  projects.push({ url, title, cover: ogImage ?? images[0] ?? null, images: images.slice(0, 4) })
}

console.log(JSON.stringify(projects, null, 2))
