import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PurchasesNav from '@/components/purchases/PurchasesNav'

export default async function PurchasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MaxWidthWrapper className="mt-24">
      <h3 className="text-3xl font-medium">My Purchases</h3>
      <div className="mt-10 flex flex-col">
        <PurchasesNav />
        <div>{children}</div>
      </div>
    </MaxWidthWrapper>
  )
}
