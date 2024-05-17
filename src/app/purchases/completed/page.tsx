import { CompletedPurchases } from '@/components/purchases/completed'

export default async function page() {
  return (
    <div className="mt-12">
      <CompletedPurchases />
    </div>
  )
}
