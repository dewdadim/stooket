import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from './schema'
import 'dotenv/config'

const sql = new Pool({ connectionString: process.env.DRIZZLE_DATABASE_URL })
export const db = drizzle(sql, { schema: schema })
