"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SellSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CardWrapper } from "@/components/forms/card-wrapper"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sell } from "@/actions/sell"
import { db } from "@/lib/db"
import { products, test } from "@/lib/db/schema"
import { v4 as uuidv4 } from "uuid"

function RegisterForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof SellSchema>>({
    resolver: zodResolver(SellSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof SellSchema>) => {
    startTransition(() => {
      sell(values)
        .then((data) => {
          if (data?.error) {
            setSuccess("")
            setError(data.error)
          }
          if (data?.success) {
            setError("")
            form.reset()
            setSuccess(data.success)
            router.push("/")
          }
        })
        .catch(() => setError("Something went wrong"))
    })
    // Send data to API route
    // const res = await fetch("http://localhost:3000/api/sell", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title,
    //     price,
    //     description,
    //     category,
    //   }),
    // })

    // const result = await res.json()
    // console.log(result)

    // Navigate to thank you
    // router.push("/")
  }

  return (
    <div className="mt-24 flex justify-center md:mt-36">
      <CardWrapper
        header="What are you selling today?"
        className="md:w-[600px]"
      >
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
                          <SelectItem value="free items">Free Items</SelectItem>
                          <SelectItem value="food">Food & Drinks</SelectItem>
                          <SelectItem value="service">Services</SelectItem>
                          <SelectItem value="tech">Tech & Gadgets</SelectItem>
                          <SelectItem value="hobby">Hobby</SelectItem>
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

export default RegisterForm