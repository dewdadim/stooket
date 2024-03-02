import { MySql2Database, drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'
import 'dotenv/config'

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

declare global {
  var drizzle: MySql2Database<typeof schema> | undefined
}

export const db =
  globalThis.drizzle || drizzle(connection, { schema, mode: 'default' })

if (globalThis.drizzle === null) globalThis.drizzle = db
