'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notFound, useRouter } from 'next/navigation'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CardWrapper } from '@/components/forms/card-wrapper'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'
import { Copy, Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Textarea } from '../ui/textarea'

type Product = {
  data: {
    title: string | null
    id: string
    description: string | null
    username: string
    category: string | null
    price: number | null
    thumbnail: string | null
    post_at: Date | null
    update_at: Date | null
  }
}

function BuyForm(product: Product) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const date = new Date()
  const dateNow = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }

          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            router.refresh()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }
  return (
    <MaxWidthWrapper>
      <div className="mt-16 flex flex-wrap justify-center gap-4 gap-y-16 md:mt-32">
        <CardWrapper header="Request Order" className="md:w-[450px]">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter your phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="I want to..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="ex: Room B-222, Blok A, Kolej 3..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="fixed inset-x-0 bottom-0 z-20 w-full flex-none lg:static lg:w-auto">
                <Card className="p-4 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] lg:border-none lg:px-0 lg:shadow-none">
                  {isPending ? (
                    <Button disabled className="w-full">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full"
                    >
                      Purchase
                    </Button>
                  )}
                  <CardDescription className="pt-3 text-center lg:text-left">
                    By tapping on 'Purchase', you accept the{' '}
                    <span className="text-blue-400">terms & conditions </span>
                    from Stooket
                  </CardDescription>
                </Card>
              </div>
            </form>
          </Form>
        </CardWrapper>
        <Card className="z-10 h-full w-[90%] overflow-hidden md:w-80 md:max-w-96">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order Details
              </CardTitle>
              <CardDescription>Date: {dateNow}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="w-[50%] text-muted-foreground">
                    {product.data.title}
                  </span>
                  <span>RM{product.data.price?.toFixed(2)}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>RM{product.data.price?.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  )
}

export default BuyForm
