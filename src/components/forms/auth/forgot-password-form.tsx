'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { CheckCircle2, Loader2 } from 'lucide-react'
import { resetPassword } from '@/actions/reset-password'

function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }

          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            setEmail(data.email)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-36 flex justify-center">
      <CardWrapper
        header="Reset Password"
        headerLabel="Please enter your email, we will send you a link to Reset your password."
        backButtonLabel="Login account"
        backButtonHref="/login"
        className="md:w-[450px]"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="user@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {success ? (
              <div className="flex items-center gap-x-2 rounded-md bg-sky-500/15 p-3 text-sm text-sky-700">
                <p>
                  Email has been sent to {email}. Make sure to check your email
                  inbox or spam.
                </p>
              </div>
            ) : null}
            <FormError message={error} />
            <FormSuccess message={success} />
            {isPending ? (
              <Button disabled className="w-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button disabled={isPending} type="submit" className="w-full">
                Email me recovery link
              </Button>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ForgotPasswordForm
