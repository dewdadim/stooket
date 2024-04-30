import { institutes } from '@/drizzle/schema'
import * as z from 'zod'

const phoneValidation = new RegExp(
  /^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/,
) //Malaysia phone number regex

//login user form validation
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

//register user form validation
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Minimum 5 characters required' })
    .max(15, { message: 'Username is too long' })
    .refine((s) => !s.includes(' '), "Can't have spaces in username")
    .optional(),
  email: z
    .string()
    .email({
      message: 'Email is required',
    })
    .optional(),
  password: z
    .string()
    .min(6, {
      message: 'Minimum 6 characters required',
    })
    .optional(),
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .optional(),
  institute: z
    .string()
    .min(1, {
      message: 'Plese choose appropriate nstitute',
    })
    .optional(),
})

//sell form validation
export const SellSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Product title is required',
    })
    .max(100, { message: 'Exceeds 100 maximum characters' }),
  price: z.coerce.number().gte(1, 'Minimum price RM1.00'),
  category: z.string().min(1, {
    message: 'Please select appropriate category',
  }),
  productImages: z
    .array(
      z.object({
        url: z.string().min(1, { message: 'Image URL is required' }),
      }),
    )
    .min(3, { message: 'At least 3 images required' }),
  thumbnail: z
    .string()
    .min(1, {
      message: 'Thumbnail is required',
    })
    .optional(),
  description: z.string().optional(),
})

export const BuySchema = z.object({
  phoneNumber: z
    .string()
    .regex(phoneValidation, { message: 'Invalid phone number' }),
  message: z
    .string()
    .max(250, { message: 'Exceeds 200 maximum characters' })
    .optional(),
  location: z
    .string()
    .max(250, { message: 'Exceeds 250 maximum characters' })
    .optional(),
})
