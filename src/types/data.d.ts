type Product = {
  id: string
  username: string
  description: string | null
  title: string | null
  category: string | null
  price: number | null
  thumbnail: string | null
  status: 'listed' | 'unlisted' | 'sold' | null
  post_at: Date | null
  update_at: Date | null
}

type ProductList = {
  id: string
  title: string | null
  description: string | null
  category: string | null
  price: number | null
  thumbnail: string | null
  post_at: Date | null
  status: 'listed' | 'unlisted' | 'sold' | null
  seller: {
    username: string | null
    image: string | null
    institute: string | null
  }
}[]

type User = {
  id: string
  name: string | null
  username: string | null
  email: string
  phoneNumber: string | null
  password: string | null
  emailVerified: Date | null
  image: string | null
  institute: string | null
  isSeller: boolean | null
  register_at: Date | null
}

type Purchase = {
  id: string
  status: 'to-confirm' | 'in-progress' | 'completed' | 'cancelled' | null
  seller: string
  productId: string
  buyer: string
  buyerPhoneNumber: string
  message: string | null
  location: string | null
  purchase_at: Date | null
  complete_at: Date | null
  cancel_at: Date | null
  hasReview: boolean | null
}
