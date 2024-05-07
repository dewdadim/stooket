type SearhParams = {
  category?: string
  username?: string
}

export default async function getAllProducts(params?: SearhParams) {
  const re = /&/gi
  const categoryParams = params?.category?.replace(re, '%26')

  if (params?.category) {
    const res = await fetch(
      `https://stooket.com/api/product/?username=${params?.username}&category=${categoryParams}`,
    )
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json()
  }

  const res = await fetch(
    `https://stooket.com/api/product?username=${params?.username}`,
  )
  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json()
}
