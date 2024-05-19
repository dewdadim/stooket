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
import { Badge } from '../ui/badge'
import { ExternalLink } from 'lucide-react'

interface PurchasesTableProps {
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
      purchase_at: Date | null
      totalPrice: number | null
    }
  }[]
}

export function PurchasesTable({ purchaseReq }: PurchasesTableProps) {
  return (
    <div className="h-[450px] overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead className="w-[100px]">Buyer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Total Price (RM)</TableHead>
            <TableHead>Purchase At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
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
                <TableCell>{req.purchase.totalPrice?.toFixed(2)}</TableCell>
                <TableCell>
                  {req.purchase.purchase_at?.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      req.purchase.status === 'completed'
                        ? 'success'
                        : req.purchase.status === 'cancelled'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {req.purchase.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
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
