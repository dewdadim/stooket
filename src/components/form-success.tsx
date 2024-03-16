"use client"

import { CheckCircle2 } from "lucide-react"
import { useToast } from "./ui/use-toast"

interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null
  const { toast } = useToast()

  return toast({
    variant: "success",
    action: (
      <div className="flex w-full items-center">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        <span className="first-letter:capitalize">{message}</span>
      </div>
    ),
  })
  // return (
  //   // <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
  //   //   <CheckCircle2 className="h-4 w-4" />
  //   //   <p>{message}</p>
  //   // </div>

  // )
}
