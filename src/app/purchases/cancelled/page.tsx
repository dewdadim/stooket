import { CancelledPurchases } from '@/components/purchases/cancelled'

export default async function page() {
  return (
    <div className="mt-12">
      <CancelledPurchases />
    </div>
  )
}
