import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { currentUser } from '@/lib/auth'
import { db } from '@/drizzle'
import { products, purchases, users } from '@/drizzle/schema'
import { eq, and, or } from 'drizzle-orm'
import { Bell } from 'lucide-react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'

export async function NotificationToggle() {
  const user = await currentUser()
  const purchase_request = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .innerJoin(users, eq(users.username, purchases.buyer))
    .where(
      and(
        eq(purchases.seller, user?.username!),
        or(
          eq(purchases.status, 'in-progress'),
          eq(purchases.status, 'to-confirm'),
        ),
      ),
    )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-3 md:max-w-[520px]">
        <SheetHeader>
          <SheetTitle>Updates</SheetTitle>
        </SheetHeader>
        <section className="mt-4">
          <div className="my-2">
            Incoming purchases ({purchase_request.length})
          </div>
          {purchase_request.map((request) => (
            <div className="flex flex-row" key={request.purchase.id}>
              <div className="flex w-full items-center justify-between gap-4 rounded-md px-2 py-4 hover:bg-accent">
                <div className="flex gap-2">
                  <div className="size-12">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={request.product.thumbnail!}
                        alt={request.product.title!}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="text-sm">
                      <span className="font-medium">
                        @{request.user.username}
                      </span>{' '}
                      purchases:
                    </p>
                    <div className="line-clamp-1">{request.product.title}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  )
}
