'use client'

import {
  Table,
  TableBody,
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
import { ExternalLink } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { TableData } from './table-data'

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
              <TableData
                key={req.purchase.id}
                product={req.product}
                purchase={req.purchase}
              />
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
