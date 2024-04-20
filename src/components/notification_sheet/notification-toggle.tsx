import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { products, purchases, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Bell, HandCoins } from 'lucide-react'

export async function NotificationToggle() {
  const user = await currentUser()
  const notification_buyer = await db.query.purchases.findMany({
    where: eq(purchases.buyer, user?.username!),
  })
  const purchase_request = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .innerJoin(users, eq(users.username, purchases.buyer))
    .where(eq(purchases.seller, user?.username!))

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-[520px]">
        <SheetHeader>
          <SheetTitle>Updates</SheetTitle>
        </SheetHeader>
        <section className="mt-4">
          <div className="my-2">
            Purchase Request ({purchase_request.length})
          </div>
          {purchase_request.map((request) => (
            <div className="flex w-full items-center gap-4 rounded-md p-4 hover:bg-accent">
              <HandCoins
                className="size-10"
                strokeWidth={1.5}
                color="#285f73"
              />
              <div className="flex flex-col gap-1 " key={request.purchase.id}>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        @{request.user.username}
                      </span>{' '}
                      requests to buy:
                    </p>
                  </div>
                </div>
                <div className="">{request.product.title}</div>
              </div>
            </div>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  )
}
