'use client'

import { Button } from './button'
import { toast } from 'sonner'
import 'dotenv/config'
import { getProductById } from '@/data/product'
import { updateProductStatusById } from '@/utils/product'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import useState from 'react-usestateref'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ListProductButtonProps {
  id: string
  status: 'listed' | 'unlisted' | 'sold'
}

export const ListProductButton = ({ id, status }: ListProductButtonProps) => {
  const [statusDisplay, setStatusDisplay, statusDisplayRef] = useState<string>(
    status as string,
  )
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleClick() {
    const product = await getProductById(id)

    if (product?.status === 'listed') {
      startTransition(() => {
        updateProductStatusById(id, { status: 'unlisted' }).then(() => {
          setStatusDisplay('unlisted')
          toast.info(`Product has been ${statusDisplayRef.current}!`)
          router.refresh
        })
      })
    }

    if (product?.status === 'unlisted') {
      startTransition(() => {
        updateProductStatusById(id, { status: 'listed' }).then(() => {
          setStatusDisplay('listed')
          toast.info(`Product has been ${statusDisplayRef.current}!`)
          router.refresh()
        })
      })
    }
  }

  return (
    <>
      {isPending ? (
        <Button disabled className="w-full" variant="outline">
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          variant="outline"
          onClick={handleClick}
          disabled={isPending}
        >
          <div className="flex flex-row items-center gap-4">
            {statusDisplay?.match('unlisted') ? (
              <>
                <Eye size={16} />
                List Product
              </>
            ) : (
              <>
                <EyeOff size={16} />
                Unlist Product
              </>
            )}
          </div>
        </Button>
      )}
    </>
  )
}
