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
  getRecipeFilters,
  getChefFilters,
  setChefMapByData,
  recipeMap,
  chefMap,
} from '@utils/index'

function Index() {
  const { data = {}, error = {} } = useSwr('/api/home', fetcher)

  const [recipeList, setRecipeList] = useState([])
  const [activeVideoCard, setActiveVideoCard] = useState(-1)
  const [activeFilter, setActiveFilter] = useState('')

  const onFilterChange = function (curFilter, filterLabel) {
    // console.log({ curFilter })
    const filteredList = filterDataByMap(
      curFilter,
      recipeMap,
      data.items,
      'title'
    )
    // console.log(filteredList, curFilter, `${filterLabel}|${curFilter}`)
    setActiveFilter(`${filterLabel}|${curFilter}`)
    setRecipeList([...filteredList])
  }

  const onChefFilterChange = function (curFilter, filterLabel) {
    // console.log({ curFilter })
    const filteredList = filterDataByMap(
      curFilter,
      chefMap,
      data.items,
      'videoOwnerChannelTitle'
    )
    console.log(filteredList)
    setActiveFilter(`${filterLabel}|${curFilter}`)
    setRecipeList([...filteredList])
  }

  const filters = [
    {
      label: 'Filter By Channel',
      list: getChefFilters() || [],
      onFilterChange: onChefFilterChange,
    },
    {
      label: 'Filter By Recipe Category',
      list: getRecipeFilters() || [],
      onFilterChange: onFilterChange,
    },
  ]

  useEffect(() => {
    if (Object.keys(data).length) {
      // setting data to the list
      setRecipeList(data?.items || [])

      // set chef map
      setChefMapByData(data?.items)

      setActiveFilter(`${filters[filters.length - 1].label}|All`)
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      <PrimaryHeading text="Favorite Recipes" />
      <Box
        className="page-header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography align="center" fontSize={'3vh'} fontWeight={700}>
          Total: {recipeList.length}
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
          {recipeList.length === 0 && (
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
          {recipeList.map((x, i) => (
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
