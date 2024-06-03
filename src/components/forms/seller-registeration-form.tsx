'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSellerSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
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
import { ExternalLink, HelpCircle, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { registerSeller } from '@/actions/register-seller'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Image from 'next/image'
import { toast } from 'sonner'
import { UploadButton } from '@/utils/uploadthing'
import { useSession } from 'next-auth/react'
import { deleteFiles } from '@/server/uploadthing'

function RegisterSellerForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [studentCardValue, setStudentCardValue] = useState('')
  const { data: session, update } = useSession()

  const deleteImage = async () => {
    try {
      const UUID = studentCardValue.split('/').slice(-1)[0]
      console.log(UUID)
      await deleteFiles(UUID)
      setStudentCardValue('')

      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const form = useForm<z.infer<typeof RegisterSellerSchema>>({
    resolver: zodResolver(RegisterSellerSchema),
    defaultValues: {
      studentCard: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSellerSchema>) => {
    startTransition(() => {
      registerSeller(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            update({ isSeller: true })
            router.push('/seller-dashboard')
            router.refresh()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-24 flex justify-center md:mt-36">
      <CardWrapper
        header="Become Stooket Seller!"
        headerLabel="Successful entrepreneur start from here!"
        backButtonLabel="Cancel"
        backButtonHref="/"
        className="md:w-[500px]"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormDescription>
                      Make sure this phone number is registered with{' '}
                      <Link
                        href={'https://www.whatsapp.com/download/'}
                        target="_blank"
                        className="text-blue-400"
                      >
                        WhatsApp{' '}
                      </Link>
                      for seller-buyer communication purpose.
                    </FormDescription>
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
                name="studentCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1">
                      Student Card{' '}
                      <Popover>
                        <PopoverTrigger>
                          <HelpCircle size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-4">
                          <h3 className="text-sm font-medium">
                            Upload picture of your front side student card.
                          </h3>
                          <div className="flex gap-2">
                            <p className="text-sm">Example:</p>
                            <Image
                              src={'/image/student-card.jpeg'}
                              alt="student card example"
                              width={80}
                              height={80}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormLabel>
                    <FormControl>
                      {!studentCardValue.length ? (
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            toast.dismiss('onUploadBegin')
                            setStudentCardValue(res[0].url)
                            toast.success(
                              'Successfuly upload student card image!',
                            )
                            form.setValue('studentCard', res[0].url)
                            router.refresh()
                          }}
                          onUploadError={() => {
                            toast.error('File is too big!')
                          }}
                          onUploadBegin={() =>
                            toast.info('File uploading...', {
                              duration: 60000,
                              id: 'onUploadBegin',
                            })
                          }
                          content={{
                            button({ isUploading }) {
                              if (isUploading)
                                return (
                                  <Loader2 className="size-4 animate-spin" />
                                )
                              return <h2>Upload an image</h2>
                            },
                            allowedContent() {
                              return <div></div>
                            },
                          }}
                          appearance={{
                            button:
                              'text-primary bg-none text-sm text-blue-400 hover:underline',
                            container: 'w-max flex-row rounded-md',
                          }}
                        />
                      ) : (
                        <div className="flex">
                          <Input
                            {...field}
                            disabled={isPending}
                            contentEditable={false}
                            defaultValue={studentCardValue}
                            onChange={() => setStudentCardValue}
                          />
                          <Link
                            href={form.getValues('studentCard')}
                            target="_blank"
                          >
                            <Button variant="ghost" size="sm" type="button">
                              <ExternalLink />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={deleteImage}
                          >
                            <X />
                          </Button>
                        </div>
                      )}
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
                Become a Seller
              </Button>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default RegisterSellerForm
