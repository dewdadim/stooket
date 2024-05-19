import {
  DollarSign,
  Users,
  Boxes,
  CheckCheck,
  Dot,
  ReceiptText,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { db } from '@/drizzle'
import { products, purchases } from '@/drizzle/schema'
import { and, asc, count, countDistinct, eq, sql, sum } from 'drizzle-orm'
import { currentUser } from '@/lib/auth'
import { ToConfirmTable } from './to-confirm-table'
import { InProgressTable } from './in-progress-table'
import { PurchasesTable } from './purchases-table'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '../ui/tabs'
import { ProductsTable } from './products-table'

export default async function SellerDashboard() {
  const user = await currentUser()

  const productData = await db
    .select()
    .from(products)
    .where(eq(products.username, user?.username!))
    .orderBy(asc(products.status))

  const cardValue = await db
    .select({
      totalCustomers: countDistinct(purchases.buyer),
      totalSales: sum(purchases.totalPrice),
      totalProducts: countDistinct(products.id),
      totalCompletedPurchases: count(purchases.id),
    })
    .from(purchases)
    .fullJoin(products, eq(purchases.productId, products?.id!))
    .where(
      and(
        eq(purchases.seller, user?.username!),
        eq(purchases.status, 'completed'),
      ),
    )
    .limit(1)

  const toConfirmPurchase = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .where(
      and(
        eq(purchases.seller, user?.username!),
        eq(purchases.status, 'to-confirm'),
      ),
    )

  const inProgressPurchase = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .where(
      and(
        eq(purchases.seller, user?.username!),
        eq(purchases.status, 'in-progress'),
      ),
    )

  const purchase = await db
    .select()
    .from(purchases)
    .innerJoin(products, eq(products.id, purchases.productId))
    .where(eq(purchases.seller, user?.username!))
    .orderBy(asc(purchases.status))

  const cardData = [
    {
      tile: 'Products',
      icon: <Boxes className="h-5 w-5 text-muted-foreground" />,
      value: productData.length,
    },
    {
      tile: 'Sales (RM)',
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
      value: parseFloat(cardValue[0].totalSales!).toFixed(2),
    },
    {
      tile: 'Customers',
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      value: cardValue[0].totalCustomers,
    },
    {
      tile: 'Completed Purchases',
      icon: <CheckCheck className="h-5 w-5 text-muted-foreground" />,
      value: cardValue[0].totalCompletedPurchases,
    },
  ]

  return (
    <main>
      <h3 className="text-3xl font-medium">Seller Dashboard</h3>
      <div className="flex flex-col gap-8">
        <section className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cardData.map((data) => (
            <Card key={data.tile}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {data.tile}
                </CardTitle>
                {data.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{data.value}</div>
              </CardContent>
            </Card>
          ))}
        </section>
        <Tabs className="w-full" defaultValue="purchases">
          <TabsList className="mb-6 mt-8 grid h-16 w-full grid-cols-2">
            <TabsTrigger value="purchases" className="h-full space-x-4">
              <ReceiptText className="text-muted-foreground" />
              <h4 className="text-lg">Purchases</h4>
            </TabsTrigger>
            <TabsTrigger value="products" className="h-full space-x-4">
              <Boxes className="text-muted-foreground" />
              <h4 className="text-lg">Products</h4>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="purchases">
            <section className="grid gap-4 md:gap-8 lg:grid-cols-2">
              <div>
                <div className="relative w-fit">
                  <h4 className="mb-4 text-2xl font-medium">
                    Purchases to confirm
                  </h4>
                  {toConfirmPurchase.length ? (
                    <Dot
                      size={64}
                      className="absolute -right-8 -top-6 animate-ping text-red-600"
                    />
                  ) : null}
                </div>
                <ToConfirmTable purchaseReq={toConfirmPurchase} />
              </div>
              <div>
                <div className="relative w-fit">
                  <h4 className="mb-4 text-2xl font-medium">
                    Purchases in progress
                  </h4>
                  {inProgressPurchase.length ? (
                    <Dot
                      size={64}
                      className="absolute -right-8 -top-6 animate-ping text-red-600"
                    />
                  ) : null}
                </div>
                <InProgressTable purchaseReq={inProgressPurchase} />
              </div>
            </section>
            <section>
              <h4 className="mb-4 text-2xl font-medium">All purchases</h4>
              <PurchasesTable purchaseReq={purchase} />
            </section>
          </TabsContent>
          <TabsContent value="products">
            <section>
              <ProductsTable products={productData} />
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
