import { getUserByUsername } from '@/data/user'
import { PurchasedProduct } from './purchased-product'
import { db } from '@/drizzle'
import { purchases, products, users } from '@/drizzle/schema'
import { and, desc, eq, or } from 'drizzle-orm'
import { currentUser } from '@/lib/auth'

export async function CancelledPurchases() {
  const user = await currentUser()
  const data = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .innerJoin(users, eq(users.username, purchases.seller))
    .where(
      and(
        eq(purchases.buyer, user?.username!),
        eq(purchases.status, 'cancelled'),
      ),
    )
    .orderBy(desc(purchases.cancel_at))

  return (
    <section className="flex flex-col gap-8">
      {data.length ? (
        data.map((request) => (
          <PurchasedProduct
            key={request.purchase.id}
            id={request.purchase.id}
            sellerName={request.user.name!}
            sellerPhone={request.user.phoneNumber!}
            thumbnail={request.product.thumbnail!}
            title={request.product.title!}
            category={request.product.category!}
            price={request.product.price!}
            status={request.purchase.status!}
            date={request.purchase.purchase_at!}
            cancelledDate={request.purchase.cancel_at!}
          />
        ))
      ) : (
        <p>No purchases found...</p>
      )}
    </section>
  )
}
