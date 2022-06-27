import { useState, useEffect } from 'react'
import useSwr from 'swr'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CustomCard from '@components/Card'
import { Filter } from '@components/Base/Filter'
import { PrimaryHeading } from '@components/Base/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import {
  fetcher,
  filterDataByMap,
  getFilters,
  setMapByData,
  filterMap,
} from '@utils/index'

function Index({ asPath }) {
  const { data = {}, error = {} } = useSwr(
    `/api/home?pathname=${asPath}`,
    fetcher
  )

  const [playList, setPlayList] = useState([])
  const [activeVideoCard, setActiveVideoCard] = useState(-1)
  const [activeFilter, setActiveFilter] = useState('')

  const onFilterChange = function (curFilter, filterLabel) {
    // console.log({ curFilter })
    const filteredList = filterDataByMap(
      curFilter,
      filterMap,
      data?.results?.items,
      'videoOwnerChannelTitle'
    )
    console.log(filteredList)
    setActiveFilter(`${filterLabel}|${curFilter}`)
    setPlayList([...filteredList])
  }

  const filters = [
    {
      label: 'Filter By Channel',
      list: getFilters() || [],
      onFilterChange,
    },
  ]

  useEffect(() => {
    if (Object.keys(data).length) {
      // setting data to the list
      setPlayList(data?.results?.items || [])

      // set dynamic map
      setMapByData(data?.results?.items)

      setActiveFilter(`${filters[filters.length - 1].label}|All`)
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      <PrimaryHeading text={data?.title || ''} />
      <Box
        className="page-header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography align="center" fontSize={'3vh'} fontWeight={700}>
          Total: {playList.length}
        </Typography>
        <Box className="filter-panel" sx={{ display: 'flex' }}>
          {filters?.map((x, id) => (
            <Filter
              {...x}
              key={`custom-filter-${id}`}
              shouldDisable={
                x.label !== activeFilter.split('|')[0] &&
                activeFilter.split('|')[1] !== 'All'
              }
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{ flexGrow: 1 }}
        className={activeVideoCard !== -1 ? 'hasVideo' : ''}
      >
        {Object.keys(data).length === 0 && (
          <Box
            sx={{
              display: 'flex',
              height: '80vh',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Grid container spacing={3}>
          {playList.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                height: '80vh',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography>There are no recipes to display!</Typography>
            </Box>
          )}
          {playList.map((x, i) => (
            <Grid
              item
              sm={6}
              xs={12}
              lg={3}
              md={4}
              key={`dynamic-list-${i}`}
              className={`grid-overwrites ${
                activeVideoCard === i ? 'showVideo' : ''
              }`}
            >
              <CustomCard
                {...x}
                state={{
                  defaultCardIndex: i,
                  activeVideoCard,
                  setActiveVideoCard,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

/**
 *
 * @todo
 * where we have to connect to DB to handle the data
 * @returns
 */
export async function getServerSideProps() {
  return { props: {} }
}

export { Index }
export default Index
