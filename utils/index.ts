export const fetcher = url => fetch(url).then(res => res.json())

export const recipeMap = new Map()
recipeMap.set('All', [])
recipeMap.set('Veg Biryani', ['vegetable', 'biryani'])
recipeMap.set('Non-Veg Biryani', ['mutton', 'chicken', 'egg', 'biryani'])
recipeMap.set('Veg Gravy', ['mushroom', 'gravy'])
recipeMap.set('Non-Veg Gravy', ['chicken', 'gravy'])
recipeMap.set('Sweet', ['sweet'])
recipeMap.set('Poriyal', ['kootu', 'poriyal'])
recipeMap.set('Kuzhambu', ['kulambu', 'curry', 'sambar', 'kuzhambu'])
recipeMap.set('Rasam', ['rasam'])
recipeMap.set('Dry', ['dry'])
recipeMap.set('Fry', ['fry'])

export const chefMap = new Map()
chefMap.set('All', [])

export const getRecipeFilters = () => {
  let arr = []
  recipeMap.forEach((value, key) => {
    arr.push(key)
  })
  return arr
}

export const setChefMapByData = (list = []) => {
  list.forEach(x => {
    let title = x?.snippet?.videoOwnerChannelTitle
    if (title) {
      chefMap.set(title, [title])
    }
  })
}

export const getChefFilters = () => {
  let arr = []
  chefMap.forEach((value, key) => {
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
