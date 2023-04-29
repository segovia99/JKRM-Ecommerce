import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config'

export default async function connection () {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: { rejectUnauthorized: false }
  })

  return conn
}
