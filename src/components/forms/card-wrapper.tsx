'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/forms/header'
import { BackButton } from '@/components/forms/back-button'
import { cn } from '@/lib/utils'
import { Social } from './auth/social'
import { Separator } from '../ui/separator'

interface CardWrapperProps {
  children: React.ReactNode
  header?: string
  headerLabel?: string
  hasBackButton?: boolean
  backButtonLabel?: string | undefined
  backButtonHref?: string | undefined
  showSocial?: boolean
  className?: string
}

export const CardWrapper = ({
  children,
  header,
  headerLabel,
  hasBackButton = false,
  backButtonLabel,
  backButtonHref,
  className,
  showSocial,
}: CardWrapperProps) => {
  if (backButtonLabel) hasBackButton = true

  return (
    <Card
      className={cn(
        'w-full border-none shadow-none md:w-[400px] md:shadow-xl md:dark:border-solid md:dark:border-secondary',
        className,
      )}
    >
      <CardHeader className={!header ? 'p-0' : ''}>
        <Header label={headerLabel} header={header} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {hasBackButton ? (
        <CardFooter>
          <BackButton label={backButtonLabel!} href={backButtonHref!} />
        </CardFooter>
      ) : null}
    </Card>
  )
}
