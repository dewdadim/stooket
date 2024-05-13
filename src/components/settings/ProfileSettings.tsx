'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileSettingsSchema } from '@/schemas'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import institutes from '@/data/institute.json'
import { ChangeImage } from './ChangeImage'
import { updateProfile } from '@/actions/update-profile'
import { useSession } from 'next-auth/react'

interface ProfileSettingsProps {
  user: User
  className?: string
}

function ProfileSettings({ user, className }: ProfileSettingsProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof ProfileSettingsSchema>>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      name: user?.name!,
      institute: user?.institute!,
    },
  })

  const onSubmit = (values: z.infer<typeof ProfileSettingsSchema>) => {
    startTransition(() => {
      updateProfile(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            update({ name: values.name })
            router.push(`/${user.username}`)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className={className}>
      <CardWrapper className="md:w-full md:shadow-md" header="Edit Profile">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Image</label>
                <ChangeImage user={user} />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
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
                    <FormLabel>Institute</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {institutes.map((institute) => (
                            <SelectItem
                              key={institute.id}
                              value={institute.name}
                            >
                              {institute.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    (!form.formState.dirtyFields.institute &&
                      !form.formState.dirtyFields.name)
                  }
                  type="submit"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ProfileSettings
