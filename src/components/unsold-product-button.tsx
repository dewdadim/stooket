'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { toast } from 'sonner'
import 'dotenv/config'
import { useTransition } from 'react'
import { unsoldProduct } from '@/actions/products'

interface UnsoldButtonProps {
  id: string
}

export const UnsoldProductButton = ({ id }: UnsoldButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick(id: string) {
    startTransition(() => {
      unsoldProduct(id)
        .then((data) => {
          if (data?.error) {
            router.refresh()
            toast.warning(data.error)
          }
          if (data?.success) {
            router.refresh()
            toast.info(data.success)
          }
        })
        .catch(() => {
          toast.error('Something went wrong')
          router.refresh()
        })
    })
  }

  return (
    <Button onClick={() => handleClick(id)}>
      <div className="flex flex-row items-center gap-4">Unsold</div>
    </Button>
  )
}
