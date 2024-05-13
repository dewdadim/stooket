import { currentUser } from './auth'

export default async function getAllProducts(username?: string) {
  const res = await fetch(
    `https://stooket.com/api/product?username=${username}`,
  )
  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json()
}
