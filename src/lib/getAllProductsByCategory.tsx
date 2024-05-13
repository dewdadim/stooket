import axios from 'axios'

export default async function getAllProductsByCategory(
  username?: string,
  category?: string,
) {
  const re = /&/gi
  const categoryParams = category?.replaceAll(re, '%26')

  if (category) {
    const res = await fetch(
      `https://stooket.com/api/product/category/${categoryParams}?username=${username}`,
    )
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json()
  }

  await axios
    .get(`/api/product?username=${username}`)
    .then((res) => {
      return res.data.json()
    })
    .catch((error) => {
      console.log(error)
    })
}
