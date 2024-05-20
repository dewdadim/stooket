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
import Image from 'next/image'
import { Edit, Trash2 } from 'lucide-react'
import { AspectRatio } from '../ui/aspect-ratio'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { DeleteProductButton } from '../ui/delete-product-button'
import { Badge } from '../ui/badge'
import { ListProductButton } from '../ui/list-product-button'
interface ProductsTableProps {
  products: {
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
  }[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="max-h-[450px] overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (RM)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length ? (
            products.map((req) => (
              <TableRow key={req.id!}>
                <TableCell className="font-medium">
                  <Link
                    href={`/product/${req.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <div className="hidden size-12 lg:inline-block">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={req.thumbnail!}
                          alt={req.title!}
                          fill
                          className="rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <div>{req.title!}</div>
                  </Link>
                </TableCell>
                <TableCell>{req.category!}</TableCell>
                <TableCell>{req.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{req.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Link href={`/edit/product/${req.id}`}>
                      <Button size="sm" variant="outline">
                        <Edit size={16} />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure want to delete this product? It will
                            permenantly delete this product from our server and
                            cannot be undone. All your purchases record related
                            to this product will gone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <DeleteProductButton id={req.id} />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <ListProductButton
                      id={req.id}
                      status={req.status!}
                      size="sm"
                      disableText
                    />
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
