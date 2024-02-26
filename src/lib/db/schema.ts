import { mysqlTable, text, varchar, int } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  username: varchar('username', { length: 256 }).unique(),
  fullname: varchar('fullname', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
})

export const post = mysqlTable('post', {
  id: int('id').autoincrement().primaryKey(),
  title: text('title'),
  likes: int('likes'),
  userId: int('userId'),
})
