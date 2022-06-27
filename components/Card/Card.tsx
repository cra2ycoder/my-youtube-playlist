import { useState, memo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function MultiActionAreaCard(props) {
  const {
    snippet: { title = '', thumbnails = {}, resourceId = {} } = {},
    state: {
      defaultCardIndex = 0,
      activeVideoCard = -1,
      setActiveVideoCard = () => {},
    } = {},
  } = props

  const [playVideo, setPlayVideo] = useState<boolean>(false)

  const videoId = `https://www.youtube.com/embed/${resourceId?.videoId}?enablejsapi=1`

  const loadVideo = () => {
    setPlayVideo(true)
    setActiveVideoCard(defaultCardIndex)
  }

  const shouldLoadVideo = playVideo && defaultCardIndex === activeVideoCard

  return (
    <Card
      className="multiaction-area-card"
      square={true}
      variant="outlined"
      style={{ display: 'flex', height: '100%', borderRadius: '0.5rem' }}
      onClick={loadVideo}
    >
      <CardActionArea>
        {!shouldLoadVideo && (
          <LazyLoadImage
            alt={title}
            src={thumbnails?.medium?.url}
            width="100%"
          />
        )}
        {shouldLoadVideo && (
          <iframe
            id="player"
            width="100%"
            height="390"
            allowFullScreen={true}
            src={videoId}
            frameBorder="0"
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontSize={16}
            fontWeight={500}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default memo(MultiActionAreaCard)
