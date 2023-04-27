import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_NAME } from '@/services/config'
import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  ssl: { rejectUnauthorized: false }
})
