'use client'

import { ArrowLeft, CheckCheck, Clock, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { cn } from '@/lib/utils'
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from '../ui/dialog'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { CancelPurchaseSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cancelPurchase, completePurchase } from '@/actions/purchases'
import { toast } from 'sonner'
import { useTransition } from 'react'
import Link from 'next/link'
import { ImWhatsapp } from 'react-icons/im'

interface PurchaseDetailsProps {
  purchaseData: Purchase
  productData: Product
  seller: User
  buyer: User
  cancel: {
    by: string
    reason: string
    at?: Date | undefined
  }
}

export default function PurchaseDetails({
  purchaseData,
  productData,
  seller,
  buyer,
  cancel,
}: PurchaseDetailsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CancelPurchaseSchema>>({
    resolver: zodResolver(CancelPurchaseSchema),
    defaultValues: {
      reason: '',
      by: 'buyer',
      id: purchaseData.id,
    },
  })

  function handleComplete() {
    startTransition(() => {
      completePurchase(purchaseData.id).then((data) => {
        if (data.error) {
          return toast.info(data.error)
        }
        if (data.success) {
          toast.success(data.success)
          router.push('/purchases/completed')
          router.refresh()
        }
      })
    })
  }

  const handleCancel = async (values: z.infer<typeof CancelPurchaseSchema>) => {
    startTransition(() => {
      cancelPurchase(values).then((data) => {
        if (data.error) {
          return toast.info(data.error)
        }
        if (data.success) {
          toast.info(data.success)
          router.push('/purchases/cancelled')
          router.refresh()
        }
      })
    })
  }

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
          <div className="flex gap-2 md:gap-4">
            <div className="w-24 md:w-32">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={productData.thumbnail!}
                  alt={productData.title!}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-1 flex-col gap-1">
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
                    <div className="flex animate-pulse items-start gap-2 duration-1000">
                      <Clock size={32} className="text-sky-500" />
                      <CardTitle className="text-xl text-sky-500">
                        {purchaseData.status === 'in-progress'
                          ? 'Purcase in progress'
                          : 'Waiting for Seller Confirmation'}
                      </CardTitle>
                    </div>
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
                    Cancelled by {cancel.by ?? 'system'} at{' '}
                    {purchaseData.cancel_at?.toLocaleString()}
                  </p>
                  <p className="text-red-500">
                    <span className="font-medium">Reason:</span> {cancel.reason}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          </div>
          <Separator />
          <div className="mt-4 flex w-full flex-col justify-end gap-2">
            {purchaseData.status === 'in-progress' ||
            purchaseData.status === 'to-confirm' ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="w-full">
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Purchase</DialogTitle>
                      <DialogDescription>
                        Having a problem? You have change your mind?
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(handleCancel)}
                      >
                        <FormField
                          control={form.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Title</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="It is because..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit" disabled={isPending}>
                            Cancel Purchase
                          </Button>
                          <DialogClose asChild className="mb-2">
                            <Button type="button" variant="outline">
                              Back
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Link
                  href={`https://wa.me/6${seller.phoneNumber}`}
                  target="_blank"
                >
                  <Button variant="outline" className="w-full py-6">
                    Contact Seller
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="w-full py-6">
                      Complete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Proceed to complete purchase?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Have you got the product and satisfy with it? By
                      proceeding to complete, the purchase will be consider as
                      &rsquo;completed&rsquo&rsquo; and will have no further
                      action.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogAction asChild>
                        <Button onClick={handleComplete}>Complete</Button>
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : purchaseData.status === 'completed' ? (
              <Link href={`/purchase/${productData.id}`}>
                <Button className="w-full py-6">Buy Again</Button>
              </Link>
            ) : purchaseData.status === 'cancelled' ? null : null}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
