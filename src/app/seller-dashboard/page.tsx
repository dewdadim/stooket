import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SellerDashboard from '@/components/seller/dashboard'

export default function page() {
  return (
    <MaxWidthWrapper className="mt-24">
      <SellerDashboard />
    </MaxWidthWrapper>
  )
}
