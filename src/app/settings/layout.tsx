import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SettingsNav from '@/components/settings/SettingsNav'
import { Separator } from '@/components/ui/separator'
import { headers } from 'next/headers'

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerList = headers()
  const pathname = headerList.get('x-current-path')
  const currentPage = pathname?.split('/').slice(-1)[0]

  return (
    <MaxWidthWrapper className="lg:52 mt-14 flex flex-row flex-wrap justify-center md:mt-20 md:px-32">
      <SettingsNav className="w-full lg:w-44" currentPage={currentPage!} />
      <Separator className="my-4 lg:hidden" />
      <div className="w-full lg:w-[550px]">{children}</div>
    </MaxWidthWrapper>
  )
}
