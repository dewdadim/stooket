'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { SellSchema } from '@/schemas'
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
import { Loader2, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sell } from '@/actions/sell'
import { deleteFiles } from '@/server/uploadthing'
import { toast } from 'sonner'
import { AspectRatio } from '../ui/aspect-ratio'
import { UploadButton } from '@/utils/uploadthing'
import categories from '@/data/category.json'
import { useCurrentUser } from '@/hooks/use-current-user'

interface ImageProps {
  id: number
  value: {
    url: string
  }
}

function SellForm() {
  const MAX_IMAGES = 8

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [imagePreviews, setImagePreview] = useState<ImageProps[]>([])
  const [thumbnail, setThumbnail] = useState('')
  const currentUser = useCurrentUser()

  const addImagePreview = (url: string) => {
    setImagePreview([
      ...imagePreviews,
      {
        id: imagePreviews.length,
        value: {
          url: url,
        },
      },
    ])
  }

  const deleteImagePreview = async (imagePreview: string) => {
    try {
      const UUID = imagePreview.split('/').slice(-1)[0]
      await deleteFiles(UUID)
      setImagePreview(imagePreviews.filter((a) => a.value.url !== imagePreview))

      console.log(imagePreviews)
    } catch (error) {
      console.error(error)
    }
  }

  const form = useForm<z.infer<typeof SellSchema>>({
    resolver: zodResolver(SellSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
    },
  })

  const { append, remove } = useFieldArray({
    name: 'productImages',
    control: form.control,
  })

  const onSubmit = async (values: z.infer<typeof SellSchema>) => {
    startTransition(() => {
      sell(values)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            router.push(`/product/${data.id}`)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-24 flex justify-center md:mt-36">
      <CardWrapper
        header="What are you selling today?"
        className="md:w-[650px]"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="productImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <div>
                      <div className="overflow-auto">
                        <div>
                          <div className="flex flex-wrap gap-4 md:gap-2">
                            {imagePreviews.map((imagePreview) => (
                              <div
                                className="size-40 rounded-md bg-slate-400 md:size-36"
                                key={imagePreview.id}
                              >
                                <div className="absolute z-10 flex size-40 items-center justify-center rounded-md opacity-0 hover:bg-black hover:bg-opacity-45 hover:opacity-100 md:size-36">
                                  <X
                                    className="z-10 size-10 cursor-pointer rounded-md"
                                    onClick={() => {
                                      remove(imagePreview.id)
                                      deleteImagePreview(imagePreview.value.url)
                                    }}
                                    color="#ffff"
                                  />
                                </div>
                                <AspectRatio ratio={1 / 1}>
                                  <Image
                                    src={imagePreview.value.url}
                                    alt="image"
                                    className="rounded-md object-cover"
                                    fill
                                  />
                                </AspectRatio>
                              </div>
                            ))}
                            {imagePreviews.length < MAX_IMAGES ? (
                              <div className="flex size-40 items-center justify-center rounded-md border-2 border-dashed border-secondary md:size-36">
                                <UploadButton
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                    addImagePreview(res[0].url)
                                    form.setValue('thumbnail', res[0].url)
                                    append({ url: res[0].url })
                                    toast.dismiss('onUploadBegin')
                                    toast.success('File uploaded!')
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
                                      return <h2>Upload Image</h2>
                                    },
                                    allowedContent() {
                                      return <div>Image (max 4MB)</div>
                                    },
                                  }}
                                  appearance={{
                                    button: 'text-primary',
                                    container:
                                      'size-36 bg-slate-400 bg-opacity-0 hover:bg-opacity-10',
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Name your product"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.title}
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <div className="flex items-center">
                      <p className="rounded-l-md bg-secondary p-2">RM</p>
                      <FormControl>
                        <Input
                          className="rounded-l-none"
                          {...field}
                          disabled={isPending}
                          placeholder="0.00"
                          type="number"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="This product is..."
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
                Add Product
              </Button>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default SellForm
