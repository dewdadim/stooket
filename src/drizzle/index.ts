import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema: schema })

// import { Pool } from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-serverless'
// import * as schema from './schema'
// import 'dotenv/config'

// //export const db = drizzle(sql)
// const pool = new Pool({ connectionString: process.env.DRIZZLE_DATABASE_URL })
// export const db = drizzle(pool, { schema: schema })
