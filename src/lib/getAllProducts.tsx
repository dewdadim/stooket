type SearhParams = {
  category?: string
  username?: string
}

export default async function getAllProducts({
  category,
  username,
}: SearhParams) {
  const re = /&/gi
  const categoryParams = category?.replace(re, '%26')

  if (category) {
    const res = await fetch(
      `https://stooket.com/api/product/?username=${username}&category=${categoryParams}`,
    )
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json()
  }

  const res = await fetch(
    `https://stooket.com/api/product?username=${username}`,
  )
  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json()
}
