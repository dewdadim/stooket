import * as z from "zod"

//login user form validation
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

//register user form validation
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Minimum 5 characters required" })
    .max(15, { message: "Username is too long" })
    .refine((s) => !s.includes(" "), "Can't have spaces in username"),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
})
