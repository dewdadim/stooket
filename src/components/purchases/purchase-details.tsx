'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { Timeline } from './timeline'

interface PurchaseDetailsProps {
  purchaseData: Purchase
}

export default function PurchaseDetails({
  purchaseData,
}: PurchaseDetailsProps) {
  const router = useRouter()
  return (
    <main className="mt-24 flex justify-center md:mt-36">
      <Card className="w-full md:w-[700px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="space-x-1"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
              <p>Back</p>
            </Button>
            <div className="flex h-5 gap-2">
              <p className="hidden text-sm md:inline-flex">
                Order ID: {purchaseData.id}
              </p>
              <Separator
                orientation="vertical"
                className="hidden md:inline-flex"
              />
              <p className="text-xs font-medium">
                {purchaseData.status === 'in-progress'
                  ? 'IN PROGRESS'
                  : purchaseData.status === 'to-confirm'
                    ? 'TO CONFIRM'
                    : purchaseData.status === 'cancelled'
                      ? 'CANCELLED'
                      : purchaseData.status === 'completed'
                        ? 'COMPLETED'
                        : null}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Timeline status={purchaseData.status!} />
        </CardContent>
      </Card>
    </main>
  )
}
