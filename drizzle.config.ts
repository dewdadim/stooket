import '@/drizzle/envConfig'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
})
