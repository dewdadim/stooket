import {
  integer,
  smallint,
  timestamp,
  pgTable,
  primaryKey,
  varchar,
  text,
  boolean,
  real,
  pgEnum,
  json,
} from 'drizzle-orm/pg-core'
import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from 'drizzle-orm'
import { register } from 'module'

//users table
export const users = pgTable('user', {
  id: varchar('id').notNull().primaryKey(),
  name: varchar('name'),
  username: varchar('username').unique(),
  email: varchar('email').notNull().unique(),
  phoneNumber: varchar('phoneNumber'),
  password: varchar('password'),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    withTimezone: true,
  }),
  image: varchar('image'),
  institute: varchar('institute'),
  isSeller: boolean('isSeller').default(false),
  studentCard: varchar('studentCard'),
  register_at: timestamp('register_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  resetPasswordToken: varchar('resetPasswordToken').unique(),
  resetPasswordTokenExpiry: timestamp('resetPasswordTokenExpiry', {
    mode: 'date',
    withTimezone: true,
  }),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(products),
}))

//accounts table
export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

//products table
export const productStatusEnum = pgEnum('productStatus', [
  'listed',
  'unlisted',
  'sold',
])
export const products = pgTable('product', {
  username: varchar('username')
    .notNull()
    .references(() => users.username, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  id: varchar('id').notNull().primaryKey(),
  title: varchar('title'),
  category: varchar('category'),
  description: text('description'),
  price: real('price'),
  thumbnail: varchar('thumbnail'),
  status: productStatusEnum('status').default('listed'),
  post_at: timestamp('post_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  update_at: timestamp('update_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
})

export const postsRelations = relations(products, ({ one }) => ({
  seller: one(users, {
    fields: [products.username],
    references: [users.username],
  }),
}))

//productImages table
export const productImages = pgTable('product_image', {
  url: varchar('url', { length: 255 }).notNull().primaryKey(),
  post_at: timestamp('post_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  productId: varchar('productId', { length: 255 })
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
})

//purchases table
export const purchaseStatusEnum = pgEnum('purchaseStatus', [
  'to-confirm',
  'in-progress',
  'completed',
  'cancelled',
])
export const purchases = pgTable('purchase', {
  id: varchar('id').notNull().primaryKey(),
  seller: varchar('seller')
    .notNull()
    .references(() => users.username, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  buyer: varchar('buyer')
    .notNull()
    .references(() => users.username, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  buyerPhoneNumber: varchar('buyerPhoneNumber').notNull(),
  message: text('message'),
  location: text('location'),
  totalPrice: real('totalPrice'),
  purchase_at: timestamp('purchase_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  cancel: json('cancel').$type<{
    by: 'buyer' | 'seller' | string
    reason: string
    at?: Date
  }>(),
  cancel_at: timestamp('cancel_at', { mode: 'date', withTimezone: true }),
  complete_at: timestamp('complete_at', { mode: 'date', withTimezone: true }),
  status: purchaseStatusEnum('status').default('to-confirm'),
  hasReview: boolean('hasReview').default(false),
  productId: varchar('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
})

// //institutes table
// export const institutes = pgTable('institute', {
//   id: varchar('id').notNull().primaryKey(),
//   name: text('name'),
//   acronym: varchar('acronym'),
//   register_at: timestamp('register_at', {
//     mode: 'date',
//     withTimezone: true,
//   }).defaultNow(),
// })

// //reviews table
// export const reviews = pgTable('review', {
//   id: varchar('id').notNull().primaryKey(),
//   buyer: varchar('buyer')
//     .notNull()
//     .references(() => users.username, {
//       onDelete: 'cascade',
//       onUpdate: 'cascade',
//     }),
//   seller: varchar('seller')
//     .notNull()
//     .references(() => users.username, {
//       onDelete: 'cascade',
//       onUpdate: 'cascade',
//     }),
//   rate: smallint('rate').default(1),
//   review: text('review'),
//   post_at: timestamp('post_at', {
//     mode: 'date',
//     withTimezone: true,
//   }).defaultNow(),
//   purchaseId: varchar('purchaseId')
//     .notNull()
//     .references(() => purchases.id, { onDelete: 'cascade' }),
// })
