import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { currentUser } from '@/lib/auth'
import { db } from '@/drizzle'
import { products, purchases, users } from '@/drizzle/schema'
import { eq, and, or } from 'drizzle-orm'
import { Bell, Dot, ExternalLink } from 'lucide-react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Badge } from '../ui/badge'

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

  const your_purchases = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .innerJoin(users, eq(users.username, purchases.seller))
    .where(
      and(
        eq(purchases.buyer, user?.username!),
        or(
          eq(purchases.status, 'in-progress'),
          eq(purchases.status, 'to-confirm'),
        ),
      ),
    )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {purchase_request.length ? (
            <Dot className="absolute -right-1 -top-2 size-10 text-red-600" />
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-3 md:max-w-[520px]">
        <SheetHeader>
          <SheetTitle>Updates</SheetTitle>
        </SheetHeader>
        <section className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-1 font-normal">
                  <p>Seller updates</p>
                  {purchase_request.length > 0 ? (
                    <div className="w-5 rounded-full bg-destructive text-sm text-white">
                      {purchase_request.length}
                    </div>
                  ) : (
                    '(0)'
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {purchase_request.map((request) => (
                  <div className="flex flex-row" key={request.purchase.id}>
                    <div className="flex w-full items-center justify-between gap-2 rounded-md px-1 py-4 hover:bg-accent md:gap-3 md:px-2">
                      <div className="w-16">
                        <AspectRatio ratio={1 / 1} className="size-full">
                          <Image
                            src={request.product.thumbnail!}
                            alt={request.product.title!}
                            fill
                            className="size-full rounded-md object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 gap-2">
                        <div className="flex flex-col">
                          <p className="text-sm">
                            <span className="font-medium">
                              @{request.user.username}
                            </span>{' '}
                            purchases:
                          </p>
                          <div className="line-clamp-2 text-sm">
                            {request.product.title}
                          </div>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link href={`/purchase/details/${request.purchase.id}`}>
                          <Button size="sm" variant="outline">
                            <p className="hidden md:inline-block">
                              View Details
                            </p>
                            <ExternalLink
                              className="inline-block md:hidden"
                              size={16}
                            />
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-1 font-normal">
                  <p>Your Purchases</p>
                  {your_purchases.length > 0 ? (
                    <div className="w-5 rounded-full bg-destructive text-sm text-white">
                      {your_purchases.length}
                    </div>
                  ) : (
                    '(0)'
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {your_purchases.map((request) => (
                  <div className="flex flex-row" key={request.purchase.id}>
                    <div className="flex w-full items-center justify-between gap-2 rounded-md px-1 py-4 hover:bg-accent md:gap-3 md:px-2">
                      <div className="w-16">
                        <AspectRatio ratio={1 / 1} className="size-full">
                          <Image
                            src={request.product.thumbnail!}
                            alt={request.product.title!}
                            fill
                            className="size-full rounded-md object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 gap-2">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">You purchase:</p>
                          <div className="line-clamp-1 text-sm">
                            {request.product.title}
                          </div>
                          <p className="text-xs">
                            <span className="font-medium">Status: </span>
                            {request.purchase.status === 'to-confirm'
                              ? 'Waiting for seller confirmation'
                              : 'In progress'}
                          </p>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link href={`/purchase/details/${request.purchase.id}`}>
                          <Button size="sm" variant="outline">
                            <p className="hidden md:inline-block">
                              View Details
                            </p>
                            <ExternalLink
                              className="inline-block md:hidden"
                              size={16}
                            />
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </SheetContent>
    </Sheet>
  )
}
