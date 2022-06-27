export default async function handler(req, res) {
  if (req.method === 'GET' && !req.url.includes('favicon.ico')) {
    // console.log(req.url)
    const playlistId = process.env.YOUTUBE_PLAYLIST_ID
    const apiKey = process.env.YOUTUBE_API_KEY
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=100`

    const results = await fetch(
      `${youtubeApiUrl}&playlistId=${playlistId}&key=${apiKey}`,
      { method: 'GET' }
    )
      .then(x => x.json())
      .catch(err => {
        console.log('youtube api error', err)
        res.status(403).json({
          error: 'youtube api error!',
        })
      })

    res.send(results)
  }
}
