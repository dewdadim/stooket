import { migrate } from "drizzle-orm/mysql2/migrator"
import { db } from "@/lib/db/index"
import "dotenv/config"

const runMigrate = async () => {
  if (!process.env.DATABASE_HOST) {
    throw new Error("DATABASE_HOST is not defined")
  }

  console.log("⏳ Running migrations...")

  const start = Date.now()

  await migrate(db, { migrationsFolder: "./drizzle" })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})
