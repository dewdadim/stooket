'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordSchema } from '@/schemas'
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
import { Loader2 } from 'lucide-react'
import { resetPassword } from '@/actions/reset-password'
import { useRouter } from 'next/navigation'

interface ResetPasswordFormProps {
  userId: string
}

function ResetPasswordForm({ userId }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      resetPassword(values, userId)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            router.push('/login')
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-36 flex justify-center">
      <CardWrapper
        header="Reset Password"
        backButtonLabel="Login account"
        backButtonHref="/login"
        className="md:w-[450px]"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex w-full justify-end">
              {isPending ? (
                <Button disabled className="w-full">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button className="w-full" disabled={isPending} type="submit">
                  Reset your password
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ResetPasswordForm
