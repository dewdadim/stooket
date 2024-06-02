import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export function ProductUnlisted() {
  return (
    <MaxWidthWrapper>
      <div className="flex h-screen w-full justify-center">
        <div className="flex h-full w-96 flex-col justify-center gap-2">
          <p className="mb-4 text-center text-7xl">👀</p>
          <h2 className="text-center text-2xl font-semibold">
            Product is not listed
          </h2>
          <p className="text-center">This is awkward, it is usually here...</p>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
