import { playListMap } from '@utils/index'

const getYouTubeApiUrl = function (apiName: string, qp: any = {}) {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  const videoPart = process.env.YOUTUBE_VIDEO_PART
  const maxSearchResults = process.env.YOUTUBE_MAX_SEARCH_RESULTS

  const basePath = `https://youtube.googleapis.com/youtube/v3`
  const defaultParams = {
    part: videoPart,
    channelId: channelId,
    maxResults: maxSearchResults,
    key: apiKey,
    ...qp,
  }

  let url = ''
  if (apiName === 'playlists') {
    url = `${basePath}/playlists?`
  } else if (apiName === 'playlistItems') {
    url = `${basePath}/playlistItems?`
  }

  Object.keys(defaultParams).forEach((key, idx) => {
    url += `${idx === 0 ? '' : '&'}${key}=${defaultParams[key]}`
  })

  return url
}

export default async function handler(req, res) {
  if (req.method === 'GET' && !req.url.includes('favicon.ico')) {
    const ytPlayListApiUrl = getYouTubeApiUrl('playlists')
    let defaultPlayListTitle = ''

    if (playListMap.size === 0) {
      const playLists = await fetch(ytPlayListApiUrl, { method: 'GET' }).then(
        x => x.json()
      )

      playLists?.items?.forEach((x: any, index: number) => {
        if (index === 1) {
          defaultPlayListTitle = x.snippet.title
        }

        playListMap.set(x.snippet.title, x.id)
      })
    }

    const ytPlayItemsApiUrl = getYouTubeApiUrl('playlistItems', {
      playlistId: playListMap.get(defaultPlayListTitle),
    })

    const results = await fetch(ytPlayItemsApiUrl, { method: 'GET' })
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
