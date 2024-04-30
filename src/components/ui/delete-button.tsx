'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { getProductById } from '@/data/product'
import 'dotenv/config'

interface DeleteButtonProps {
  id: string
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter()
  async function handleClick() {
    try {
      await fetch(`/api/product/${id}`, {
        method: 'DELETE',
      })
      toast.info(`Product deleted!`)
      router.back()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Button type="submit" variant="destructive" onClick={handleClick}>
      <div className="flex flex-row items-center gap-4">DELETE</div>
    </Button>
  )
}
