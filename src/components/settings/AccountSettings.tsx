'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AccountSettingsSchema, ProfileSettingsSchema } from '@/schemas'
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
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { updateAccount } from '@/actions/update-account'
import { useSession } from 'next-auth/react'

interface AccountSettingsProps {
  user: User
  className?: string
}

function AccountSettings({ user, className }: AccountSettingsProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof AccountSettingsSchema>>({
    resolver: zodResolver(AccountSettingsSchema),
    defaultValues: {
      username: user?.username!,
      ...(user.phoneNumber && { phoneNumber: user?.phoneNumber! }),
    },
  })

  const onSubmit = (values: z.infer<typeof AccountSettingsSchema>) => {
    startTransition(() => {
      updateAccount(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            update({ username: values.username })
            location.reload()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className={className}>
      <CardWrapper className="md:w-full md:shadow-md" header="Account">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                control={form.control}
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex w-full justify-end">
              {isPending ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button
                  disabled={
                    isPending ||
                    (!form.formState.dirtyFields.phoneNumber &&
                      !form.formState.dirtyFields.username)
                  }
                  type="submit"
                >
                  Edit Account
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default AccountSettings
