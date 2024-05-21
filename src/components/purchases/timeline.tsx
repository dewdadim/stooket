import { cn } from '@/lib/utils'
import { CheckCheck, Circle, ClipboardCheck, Hourglass, X } from 'lucide-react'

interface TimelineProps {
  status: 'to-confirm' | 'in-progress' | 'completed' | 'cancelled'
}

export function Timeline({ status }: TimelineProps) {
  return (
    <section className="px-8 py-4">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Circle />
          <p className={status === 'to-confirm' ? 'animate-pulse' : ''}>
            Waiting for seller confirmation
          </p>
        </div>
        <div className="flex gap-2">
          <Circle />
          <p>Purchase in progress</p>
        </div>
        <div className="flex gap-2">
          <Circle />
          <p>Purchase completed</p>
        </div>
        <div className="flex gap-2">
          <Circle />
          <p>Purchase cancelled</p>
        </div>
      </div>
    </section>
  )
}
