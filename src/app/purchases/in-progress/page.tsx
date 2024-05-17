import { InProgressPurchases } from '@/components/purchases/in-progress'

export default async function page() {
  return (
    <div className="mt-12">
      <InProgressPurchases />
    </div>
  )
}
