import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()
  if (user?.isSeller) {
    redirect('/')
  }

  return (
    <MaxWidthWrapper>
      <div className="flex h-screen w-full justify-center">
        <div className="flex h-full w-96 flex-col justify-center gap-2">
          <p className="mb-3 text-center text-7xl">🤷‍♂️</p>
          <h2 className="text-center text-2xl font-semibold">
            You are not a seller
          </h2>
          <p className="text-center">
            Are you a student? You can register to become seller by clicking the
            link below
          </p>
          <Link href="/seller-registration">
            <div className="flex w-full justify-center">
              <Button className="mt-4 w-fit">Become a seller</Button>
            </div>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
