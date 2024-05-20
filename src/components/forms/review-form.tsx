'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { complete_account } from '@/actions/complete-account'
import { useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import institutes from '@/data/institute.json'
import { CardWrapper } from './card-wrapper'
import { Textarea } from '../ui/textarea'
import { Rate } from '../ui/rate'

interface ReviewFormProps {
  purchaseData: {
    id: string
    status: 'to-confirm' | 'in-progress' | 'completed' | 'cancelled' | null
    seller: string
    productId: string
    buyer: string
    buyerPhoneNumber: string
    message: string | null
    location: string | null
    cancel: { by: 'seller' | 'buyer' | string; reason: string | null } | null
    cancel_at: Date | null
    complete_at: Date | null
    purchase_at: Date | null
    hasReview: boolean | null
    totalPrice: number | null
  }
}

export function ReviewForm({ purchaseData }: ReviewFormProps) {
  const [open, setOpen] = useState(true)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const { data: session, update } = useSession()
  const user = useCurrentUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      institute: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      complete_account(values)
        .then(async (data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }

          if (data?.success) {
            setError('')
            update({ username: values.username, institute: values.institute })
            setSuccess(data.success)
            setOpen(false)
            router.push('/')
            router.refresh()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-24 flex justify-center md:mt-36">
      <CardWrapper header="How was your experience?" className="md:w-[650px]">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                      <Rate rating={1.1} className="" size={44} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your experience purchasing this product.."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            {isPending ? (
              <Button disabled className="w-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button disabled={isPending} type="submit" className="w-full">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
