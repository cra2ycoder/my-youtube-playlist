export const fetcher = url => fetch(url).then(res => res.json())

export const playListMap = new Map()

export const filterMap = new Map()
filterMap.set('All', [])

export const setMapByData = (list = []) => {
  list.forEach(x => {
    let title = x?.snippet?.videoOwnerChannelTitle
    if (title) {
      filterMap.set(title, [title])
    }
  })
}

export const getFilters = () => {
  let arr = []
  filterMap.forEach((value, key) => {
    arr.push(key)
  })
  return arr
}

export const filterDataByMap = (key, filterMap, items = [], property = '') => {
  return items.filter(curItem => {
    const { snippet = {} } = curItem
    const compareProp = snippet?.[property || 'title']

    const words = filterMap.get(key)

    if (key === 'All' && words.length === 0) {
      return curItem
    }

    let regex = new RegExp(
      '\\b(' +
        words
          .slice(0, words.length > 1 ? words.length - 1 : words.length)
          .join('|')
          .toLowerCase() +
        ')\\b',
      'g'
    )

    return (
      regex.test(compareProp.toLowerCase()) &&
      compareProp.toLowerCase().includes(words[words.length - 1].toLowerCase())
    )
  })
}
