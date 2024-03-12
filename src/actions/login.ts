import { signIn } from "next-auth/react"
import { LoginSchema } from "@/schemas"
import * as z from "zod"
import {} from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  console.log(validatedFields.data)
  
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const signInData = await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  })

  if (signInData?.ok) {
    return { success: "Login successful!" }
  }

  return { error: "Invalid fields!" }
}
