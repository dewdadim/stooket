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
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { complete_account } from '@/actions/complete-account'
import { useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CardWrapper } from './card-wrapper'
import { Textarea } from '../ui/textarea'
import { Rate } from '../ui/rate'
import { AspectRatio } from '../ui/aspect-ratio'

interface ReviewFormProps {
  product: Product
}

export function ReviewForm({ product }: ReviewFormProps) {
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
      <div className="flex w-full flex-col gap-4 md:w-fit">
        <CardWrapper className="hidden md:block md:w-[500px]">
          <div className="flex items-center gap-4">
            <Link href={'/product/' + product.id!}>
              <ArrowLeft />
            </Link>
            <div className="w-20">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={product.thumbnail!}
                  alt={product.title!}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="w-[60%]">
              <h1 className="w-full truncate font-medium">{product.title}</h1>
              <p>RM{product.price?.toFixed(2)}</p>
              <p className="text-sm">@{product.username}</p>
            </div>
          </div>
        </CardWrapper>
        <CardWrapper header="How was your experience?" className="md:w-[500px]">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full flex-col items-center">
                          <Rate
                            rating={0}
                            className=""
                            size={44}
                            variant="yellow"
                          />
                        </div>
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
                  Submit Review
                </Button>
              )}
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  )
}
