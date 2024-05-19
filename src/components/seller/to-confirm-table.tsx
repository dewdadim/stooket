'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import { startTransition } from 'react'
import { confirmPurchase } from '@/actions/purchases'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import { ExternalLink } from 'lucide-react'

interface ToConfirmTableProps {
  purchaseReq: {
    product: {
      id: string
      username: string
      description: string | null
      title: string | null
      category: string | null
      price: number | null
      thumbnail: string | null
      status: 'listed' | 'unlisted' | 'sold' | null
      post_at: Date | null
      update_at: Date | null
    }
    purchase: {
      id: string
      status: 'to-confirm' | 'in-progress' | 'completed' | 'cancelled' | null
      seller: string
      productId: string
      buyer: string
      buyerPhoneNumber: string
      message: string | null
      hasReview: boolean | null
    }
  }[]
}

export function ToConfirmTable({ purchaseReq }: ToConfirmTableProps) {
  const router = useRouter()

  const handleComplete = (id: string) => {
    startTransition(() => {
      confirmPurchase(id)
        .then((data) => {
          if (data.error) {
            return toast.info(data.error)
          }
          if (data.success) {
            toast.success(data.success)
            router.refresh()
          }
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead className="w-[100px]">Buyer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseReq.length ? (
            purchaseReq.map((req) => (
              <TableRow key={req.purchase.id!}>
                <TableCell className="font-medium">
                  <Link
                    href={`/${req.purchase.buyer}`}
                    className="hover:underline"
                  >
                    {req.purchase.buyer!}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/product/${req.product.id}`}
                    className="hover:underline"
                  >
                    {req.product?.title!}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 md:flex-nowrap">
                    <Button size="sm" variant="link">
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleComplete(req.purchase.id)}
                    >
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={6}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
