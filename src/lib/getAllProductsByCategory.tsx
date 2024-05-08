import { currentUser } from './auth'

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

  const res = await fetch(
    `http://localhost:3000/api/product?username=${username}`,
  )
  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json()
}
