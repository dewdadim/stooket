import { toast } from 'sonner'

interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null

  if (message) {
    return <div className="hidden">{toast.success(message)}</div>
  }
}
