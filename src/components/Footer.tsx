import { cn } from '@/lib/utils'
import Link from 'next/link'
import { JSX, SVGProps } from 'react'
import { Button } from './ui/button'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn('bg-primary-foreground py-6 text-primary', className)}
    >
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
        <div className="mb-2 text-2xl font-bold text-primary md:mb-0">
          <Link href="/">Stooket</Link>
        </div>
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <p className="text-sm">© 2024 Stooket. All rights reserved.</p>
        </div>
        {/* <div className="flex items-center justify-center space-x-4">
          <Link href={"https://forms.gle/dHhrwCkj2QUdAwMFA"} target="_blank">
            <Button>Give us your opnion!</Button>
          </Link>
        </div> */}
      </div>
    </footer>
  )
}
