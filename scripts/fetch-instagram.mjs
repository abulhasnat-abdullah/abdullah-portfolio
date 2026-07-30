const res = await fetch('https://www.instagram.com/aquarelle_verse/?__a=1&__d=dis', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    Accept: 'text/html,application/xhtml+xml',
  },
})
console.log('status', res.status)
const html = await res.text()
const jsonMatch = html.match(/"edge_owner_to_timeline_media":\{"count":(\d+),"page_info":\{[^}]+\},"edges":(\[[\s\S]*?\])\}/)
if (jsonMatch) {
  console.log('found edges')
} else {
  const urls = [...html.matchAll(/https:\/\/[^"']*cdninstagram\.com[^"']+\.(?:jpg|webp)/g)].map((m) => m[0])
  console.log('cdn urls', [...new Set(urls)].slice(0, 10))
  const posts = [...html.matchAll(/"shortcode":"([A-Za-z0-9_-]+)"/g)].map((m) => m[1])
  console.log('shortcodes', [...new Set(posts)].slice(0, 12))
}
