import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  CheckCircle2,
  InfoIcon,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CompleteAccountDialog } from '@/components/forms/complete-account-dialog'
import { currentUser } from '@/lib/auth'
import { getUserById } from '@/data/user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://stooket.com'),
  title: { default: 'Stooket | Student Marketplace', template: '%s - Stooket' },
  description:
    'Stooket is the best and only student marketplace in Malaysia! It helps student to sell and buy either new or used stuff in their institute.',
  openGraph: {
    images: 'https://www.stooket.com/opengraph-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    images: 'https://www.stooket.com/opengraph-image.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  const user = await currentUser()
  const userDetails = (await getUserById(user?.id!)) ?? null

  return (
    <html lang="en" className="h-full">
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              richColors
              position="top-center"
              visibleToasts={1}
              icons={{
                success: <CheckCircle2 />,
                info: <InfoIcon />,
                warning: <AlertOctagonIcon />,
                error: <AlertTriangleIcon />,
              }}
            />
            <main className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1 flex-grow">
                {session?.user &&
                userDetails &&
                (!userDetails?.username || !userDetails?.institute) ? (
                  <CompleteAccountDialog />
                ) : null}
                {children}
              </div>
              <Footer className="mt-16" />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
