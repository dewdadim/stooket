import Link from 'next/link'
import { TableCell, TableRow } from '../ui/table'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../ui/dialog'
import { ExternalLink } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CancelPurchaseSchema } from '@/schemas'
import { z } from 'zod'
import { cancelPurchase, confirmPurchase } from '@/actions/purchases'
import { toast } from 'sonner'
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

interface TableDataProps {
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
}

export function TableData(req: TableDataProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof CancelPurchaseSchema>>({
    resolver: zodResolver(CancelPurchaseSchema),
    defaultValues: {
      reason: '',
      by: 'seller',
      id: req.purchase.id,
    },
  })

  const handleCancel = async (values: z.infer<typeof CancelPurchaseSchema>) => {
    startTransition(() => {
      cancelPurchase(values).then((data) => {
        if (data.error) {
          return toast.info(data.error)
        }
        if (data.success) {
          toast.info(data.success)
          router.refresh()
        }
      })
    })
  }

  const handleConfirm = (id: string) => {
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
    <TableRow key={req.purchase.id!}>
      <TableCell className="font-medium">
        <Link href={`/${req.purchase.buyer}`} className="hover:underline">
          {req.purchase.buyer!}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          href={`/product/${req.product.id}`}
          className="line-clamp-2 hover:underline"
        >
          {req.product?.title!}
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1 md:flex-nowrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="link">
                Cancel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Purchase</DialogTitle>
                <DialogDescription>
                  Having a problem? Cancelling purchase may be solution.
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
                        <FormLabel>Why cancelling purchase?</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="It is because..." />
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
          {req.purchase.status === 'in-progress' ? (
            <Link
              href={`https://wa.me/6${req.purchase.buyerPhoneNumber}`}
              target="_blank"
            >
              <Button size="sm" variant="outline">
                Contact
              </Button>
            </Link>
          ) : req.purchase.status === 'to-confirm' ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Confirm
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>
                  Are you sure to confirm this request?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Confirm purchase request of product {req.product.title} by @
                  {req.purchase.buyer}
                </AlertDialogDescription>

                <AlertDialogFooter>
                  <AlertDialogAction asChild>
                    <Button onClick={() => handleConfirm(req.purchase.id)}>
                      Confirm
                    </Button>
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}

          <Link href={`/purchase/details/${req.purchase.id}`}>
            <Button size="sm" variant="outline">
              <ExternalLink size={16} />
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  )
}
