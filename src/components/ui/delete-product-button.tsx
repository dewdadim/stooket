'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { getProductById } from '@/data/product'
import 'dotenv/config'
import { useTransition } from 'react'
import { deleteProduct } from '@/actions/products'

interface DeleteButtonProps {
  id: string
}

export const DeleteProductButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick(id: string) {
    startTransition(() => {
      deleteProduct(id)
        .then((data) => {
          if (data?.error) {
            toast.warning(data.error)
            router.refresh()
          }
          if (data?.success) {
            toast.info(data.success)
            router.refresh()
          }
        })
        .catch(() => {
          toast.error('Something went wrong')
          router.refresh()
        })
    })
  }

  return (
    <Button type="submit" variant="destructive" onClick={() => handleClick(id)}>
      <div className="flex flex-row items-center gap-4">DELETE</div>
    </Button>
  )
}
