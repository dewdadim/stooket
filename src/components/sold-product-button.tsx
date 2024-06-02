'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { toast } from 'sonner'
import 'dotenv/config'
import { useTransition } from 'react'
import { soldProduct } from '@/actions/products'

interface SoldButtonProps {
  id: string
}

export const SoldProductButton = ({ id }: SoldButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick(id: string) {
    startTransition(() => {
      soldProduct(id)
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
      <div className="flex flex-row items-center gap-4">Sold</div>
    </Button>
  )
}
