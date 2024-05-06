type SearhParams = {
  category?: string
  search?: string
}

export default async function getAllProducts({
  category,
  search,
}: SearhParams) {
  const re = /&/gi
  const categoryParams = category?.replace(re, '%26')
  if (category) {
    const res = await fetch(
      `https://stooket.com/api/product/?category=${categoryParams}`,
    )
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json()
  }

  if (search) {
    const res = await fetch(`https://stooket.com/api/product/?search=${search}`)
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json()
  }

  const res = await fetch('https://stooket.com/api/product')
  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json()
}
