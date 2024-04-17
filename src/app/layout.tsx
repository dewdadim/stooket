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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stooket. Student Marketplace',
  description:
    'Stooket is the best and only student marketplace in Malaysia! It helps student to sell and buy either new or used stuff in their institute.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

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
              <div className="flex-1 flex-grow">{children}</div>
              <Footer className="mt-16" />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
