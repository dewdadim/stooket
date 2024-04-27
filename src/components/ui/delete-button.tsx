'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { getProductById } from '@/data/product'
import 'dotenv/config'

interface DeleteButtonProps {
  productId: string
}

export const DeleteButton = ({ productId }: DeleteButtonProps) => {
  const router = useRouter()
  async function handleClick() {
    try {
      await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      })
      console.log(process.env.PUBLIC_URL)
      toast.info(`Product deleted!`)
      router.back()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Button
      type="submit"
      className="w-full"
      variant="destructive"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-4">DELETE</div>
    </Button>
  )
}
