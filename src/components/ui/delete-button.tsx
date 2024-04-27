'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  productId: string
}

export const DeleteButton = ({ productId }: DeleteButtonProps) => {
  const router = useRouter()
  async function handleClick() {
    try {
      await fetch(`http://localhost:3000/api/product/${productId}`, {
        method: 'DELETE',
        body: productId,
      })
      router.refresh()
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
      <div className="flex flex-row items-center gap-4">
        <Trash2 size={16} />
        DELETE PRODUCT
      </div>
    </Button>
  )
}
