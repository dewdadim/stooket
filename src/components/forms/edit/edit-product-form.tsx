'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditProductSchema, SellSchema } from '@/schemas'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { editProduct } from '@/actions/products'
import categories from '@/data/category.json'

interface ImageProps {
  id: number
  value: {
    url: string
  }
}

type EditProductFormProps = {
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

function EditProductForm(product: EditProductFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof EditProductSchema>>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      title: product.data?.title!,
      category: product.data?.category!,
      price: product.data?.price!,
      description: product.data?.description!,
    },
  })

  const onSubmit = async (values: z.infer<typeof EditProductSchema>) => {
    console.log('clickkk')
    startTransition(() => {
      editProduct(values, product.data.id)
        .then((data) => {
          if (data?.error) {
            setSuccess('')
            setError(data.error)
          }
          if (data?.success) {
            setError('')
            form.reset()
            setSuccess(data.success)
            router.push(`/product/${product.data.id}`)
            router.refresh()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className="mt-24 flex justify-center md:mt-36">
      <CardWrapper header="Edit Product" className="md:w-[650px]">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
              <div className="flex flex-col gap-2">
                <Button disabled className="w-full">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
                <Button
                  disabled
                  className="w-full"
                  type="button"
                  variant="link"
                >
                  Cancel Edit
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  disabled={
                    isPending ||
                    (!form.formState.dirtyFields.category &&
                      !form.formState.dirtyFields.price &&
                      !form.formState.dirtyFields.title &&
                      !form.formState.dirtyFields.description)
                  }
                  type="submit"
                  className="w-full"
                >
                  Edit Product
                </Button>
                <Button
                  disabled={isPending}
                  className="w-full"
                  type="button"
                  variant="link"
                  onClick={router.back}
                >
                  Cancel Edit
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default EditProductForm
