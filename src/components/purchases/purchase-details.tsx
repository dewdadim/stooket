'use client'

import { ArrowLeft, CheckCheck, Clock, Info, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { Timeline } from './timeline'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ImWhatsapp } from 'react-icons/im'

interface PurchaseDetailsProps {
  purchaseData: Purchase
  productData: Product
  username: string
  cancel: {
    by: string
    reason: string
    at?: Date | undefined
  }
}

export default function PurchaseDetails({
  purchaseData,
  productData,
  username,
  cancel,
}: PurchaseDetailsProps) {
  const router = useRouter()
  return (
    <main className="mt-24 flex justify-center md:mt-36">
      <Card className="w-full md:w-[700px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="space-x-1"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
              <p>Back</p>
            </Button>
            <div className="flex h-5 gap-2">
              <p className="hidden text-sm md:inline-flex">
                Purchase ID: {purchaseData.id}
              </p>
              <Separator
                orientation="vertical"
                className="hidden md:inline-flex"
              />
              <p className="text-xs font-medium">
                {purchaseData.status === 'in-progress'
                  ? 'IN PROGRESS'
                  : purchaseData.status === 'to-confirm'
                    ? 'TO CONFIRM'
                    : purchaseData.status === 'cancelled'
                      ? 'CANCELLED'
                      : purchaseData.status === 'completed'
                        ? 'COMPLETED'
                        : null}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-52 md:w-32">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={productData.thumbnail!}
                  alt={productData.title!}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-2 text-base font-medium md:text-xl">
                {productData.title}
              </h3>
              <p className="text-xs md:text-sm">
                Category: {productData.category}
              </p>
              <p className="text-base md:text-lg">
                RM{productData.price?.toFixed(2)}
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="mb-4 font-medium">Purchase Information</h3>
            <div className="flex flex-col gap-4">
              {purchaseData.message ? (
                <div>
                  <h4 className="text-sm font-medium">Message</h4>
                  <p className="text-sm text-paragraph">
                    {purchaseData.message}
                  </p>
                </div>
              ) : null}
              <div>
                <h4 className="text-sm font-medium ">Meet-up Location</h4>
                <p className="text-sm text-paragraph">
                  {purchaseData.location}
                </p>
              </div>
            </div>
            <p className="mt-8 text-sm">
              Requested on {purchaseData.purchase_at?.toLocaleString()}
            </p>
          </div>
          <Separator />
          <div>
            <Card
              className={cn(
                'border opacity-60 shadow-none dark:bg-transparent',
                purchaseData.status === 'in-progress' ||
                  purchaseData.status === 'to-confirm'
                  ? 'border-sky-500 bg-sky-100'
                  : purchaseData.status === 'completed'
                    ? 'border-emerald-500 bg-emerald-100'
                    : purchaseData.status === 'cancelled'
                      ? 'border-red-500 bg-red-100'
                      : '',
              )}
            >
              <CardHeader>
                <div className="flex items-start gap-2">
                  {purchaseData.status === 'in-progress' ||
                  purchaseData.status === 'to-confirm' ? (
                    <>
                      <Clock size={32} className="text-sky-500" />
                      <CardTitle className="text-xl text-sky-500">
                        {purchaseData.status === 'in-progress'
                          ? 'Purcase in progress'
                          : 'Waiting for Seller Confirmation'}
                      </CardTitle>
                    </>
                  ) : purchaseData.status === 'completed' ? (
                    <>
                      <CheckCheck size={32} className="text-emerald-500" />
                      <CardTitle className="text-xl text-emerald-500">
                        Purcase completed
                      </CardTitle>
                    </>
                  ) : purchaseData.status === 'cancelled' ? (
                    <>
                      <XCircle size={32} className="text-red-500" />
                      <CardTitle className="text-xl text-red-500">
                        Purcase cancelled
                      </CardTitle>
                    </>
                  ) : null}
                </div>
              </CardHeader>
              {purchaseData.status === 'completed' ? (
                <CardContent>
                  <p className="text-emerald-600">
                    Completed at {purchaseData.complete_at?.toLocaleString()}
                  </p>
                </CardContent>
              ) : purchaseData.status === 'cancelled' ? (
                <CardContent>
                  <p className="text-red-500">
                    Cancelled by {cancel.by} at{' '}
                    {purchaseData.cancel_at?.toLocaleString()}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          </div>
          <Separator />
          <div className="mt-4 flex w-full justify-end">
            {purchaseData.status === 'in-progress' ||
            purchaseData.status === 'to-confirm' ? (
              <Button className="">
                <ImWhatsapp className="mr-2" />
                Contact{' '}
                {!productData.username.match(username) ? 'Seller' : 'Buyer'}
              </Button>
            ) : purchaseData.status === 'completed' ? (
              <Button></Button>
            ) : purchaseData.status === 'cancelled' ? (
              <Button></Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
