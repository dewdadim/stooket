'use client'

import { CheckCheck, Clock3, XSquareIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { cancelPurchase, completePurchase } from '@/actions/purchases'
import { startTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
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

interface PurchasedProductProps {
  id: string
  sellerName: string
  sellerPhone: string
  thumbnail: string
  title: string
  category: string
  price: number
  status: 'to-confirm' | 'in-progress' | 'cancelled' | 'completed' | string
  date: Date
  cancelledDate?: Date
  completedDate?: Date
}

export function PurchasedProduct({
  id,
  sellerName,
  sellerPhone,
  category,
  date,
  cancelledDate,
  completedDate,
  price,
  status,
  thumbnail,
  title,
}: PurchasedProductProps) {
  const router = useRouter()

  function handleComplete() {
    startTransition(() => {
      completePurchase(id).then((data) => {
        if (data.error) {
          return toast.info(data.error)
        }
        if (data.success) {
          toast.success(data.success)
          router.push('/purchases/completed')
        }
      })
    })
  }

  function handleCancel() {
    startTransition(() => {
      cancelPurchase(id).then((data) => {
        if (data.error) {
          return toast.info(data.error)
        }
        if (data.success) {
          toast.info(data.success)
          router.push('/purchases/cancelled')
        }
      })
    })
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <div className="flex items-baseline gap-4">
          <Link href={`/${sellerName}`}>
            <p className="font-medium">{sellerName}</p>
          </Link>
          <Link href={`https://wa.me/6${sellerPhone}`} target="_blank">
            <p className="cursor-pointer text-sm underline">Contact Seller</p>
          </Link>
        </div>
        <p className="hidden text-sm md:inline-block">
          Requested on {date.toLocaleDateString()}
        </p>
      </div>
      <Separator />
      <Link href={`/purchase/details/${id}`}>
        <div className="flex gap-2 py-2">
          <Image
            className="size-20 rounded-md bg-secondary object-cover"
            src={thumbnail}
            width={100}
            height={100}
            alt="product image"
          />
          <div>
            <h3 className="line-clamp-2 text-lg">{title}</h3>
            <p className="text-sm font-light">Category: {category}</p>
          </div>
        </div>
      </Link>
      <Separator />
      <div className="flex flex-col items-end gap-8 rounded-md bg-primary-foreground p-2">
        <div className="flex w-full justify-between">
          {status.match('to-confirm') ? (
            <div className="flex animate-pulse items-center gap-1 duration-1000">
              <Clock3 size={16} />
              <p className="text-xs md:text-sm">Waiting seller confirmation</p>
            </div>
          ) : status.match('in-progress') ? (
            <div className="flex animate-pulse items-center gap-1 duration-1000">
              <Clock3 size={16} />
              <p className="text-xs md:text-sm">In progress</p>
            </div>
          ) : status.match('completed') ? (
            <div className="flex items-center gap-2">
              <CheckCheck size={16} />
              <div>
                <p className="text-xs md:text-sm">Purchase complete!</p>
                <p className="text-xs md:text-sm">
                  {completedDate?.toLocaleString()}
                </p>
              </div>
            </div>
          ) : status.match('cancelled') ? (
            <div className="flex items-center gap-2">
              <XSquareIcon size={16} />
              <div>
                <p className="text-xs md:text-sm">Cancelled by you</p>
                <p className="text-xs md:text-sm">
                  {cancelledDate?.toLocaleString()}
                </p>
              </div>
            </div>
          ) : null}
          <div className="flex items-baseline justify-end gap-1">
            <p className="text-sm">Total:</p>
            <div className="text-xl md:text-2xl">RM{price.toFixed(2)}</div>
          </div>
        </div>
        <div className="space-x-2">
          {!status.match('completed') && !status.match('cancelled') ? (
            <>
              <Button variant="link" onClick={handleCancel}>
                Cancel
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm">Complete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>
                    Proceed to complete purchase?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Have you got the product and satisfy with it? By proceeding
                    to complete, the purchase will be consider as 'completed'
                    and will have no further action.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction asChild>
                      <Button onClick={handleComplete}>Complete</Button>
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Link href={`https://wa.me/6${sellerPhone}`} target="_blank">
                <Button variant="outline" className="hidden md:inline-block">
                  Contact Seller
                </Button>
              </Link>
            </>
          ) : null}
          {status.match('completed') ? (
            <Link href={`/review/${id}`}>
              <Button>Send Review</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
