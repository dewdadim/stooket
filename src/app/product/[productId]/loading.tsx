import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="mt-64 flex flex-col items-center justify-center gap-2">
      <Loader2 className="animate-spin" size={42} />
    </div>
  )
}
