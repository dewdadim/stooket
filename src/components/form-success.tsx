"use client"

import { CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null

  return toast.success(message)

  // return (
  //   // <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
  //   //   <CheckCircle2 className="h-4 w-4" />
  //   //   <p>{message}</p>
  //   // </div>

  // )
}
