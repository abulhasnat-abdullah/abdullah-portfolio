const ids = [
  '242777209',
  '123000689',
  '223586801',
  '223583681',
  '133800931',
  '119244255',
  '123000507',
  '211481715',
  '123161557',
  '129394989',
  '133799149',
  '133799655',
]

for (const id of ids.slice(0, 6)) {
  const url = `https://www.behance.net/services/oembed?url=https://www.behance.net/gallery/${id}`
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) {
    console.log(id, 'failed', res.status)
    continue
  }
  const data = await res.json()
  console.log(JSON.stringify({ id, title: data.title, thumbnail: data.thumbnail_url, author: data.author_name }))
}
