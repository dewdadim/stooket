import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  text,
  boolean,
  double,
} from 'drizzle-orm/mysql-core'
import type { AdapterAccount } from '@auth/core/adapters'
import { relations, sql } from 'drizzle-orm'

//users table
export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  emailVerified: timestamp('emailVerified', { mode: 'date' }).default(
    sql<string>`CURRENT_TIMESTAMP`,
  ),
  image: varchar('image', { length: 255 }),
  institute: varchar('institute', { length: 255 }),
  isSeller: boolean('isSeller').default(false),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(products),
}))

//accounts table
export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

//products table
export const products = mysqlTable('product', {
  username: varchar('username', { length: 255 })
    .notNull()
    .references(() => users.username, { onDelete: 'cascade' }),
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  title: varchar('title', { length: 255 }),
  category: varchar('category', { length: 255 }),
  description: text('description'),
  price: double('price', { precision: 6, scale: 2 }),
  thumbnail: varchar('thumbnail', { length: 255 }),
  post_at: timestamp('post_at', { mode: 'date' }).default(
    sql<string>`CURRENT_TIMESTAMP`,
  ),
  update_at: timestamp('update_at', { mode: 'date' }),
})

export const postsRelations = relations(products, ({ one }) => ({
  seller: one(users, {
    fields: [products.username],
    references: [users.username],
  }),
}))

//productImages table
export const productImages = mysqlTable('product_image', {
  url: varchar('url', { length: 255 }).notNull().primaryKey(),
  post_at: timestamp('post_at', { mode: 'date' }).default(
    sql<string>`CURRENT_TIMESTAMP`,
  ),
  productId: varchar('productId', { length: 255 })
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
})

//institutes table
export const institutes = mysqlTable('institute', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: text('name'),
  register_at: timestamp('register_at', { mode: 'date' }).default(
    sql<string>`CURRENT_TIMESTAMP`,
  ),
})
