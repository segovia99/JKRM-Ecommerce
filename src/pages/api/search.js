import { pool } from '@/db/db'
import db from 'db.json'

export default async function handler (req, res) {
  const { id, q } = req.query

  // we have an id available
  if (id) {
    const [result] = await pool.query(`SELECT * FROM productos WHERE id = ${id}`)
    return res.status(200).json(result)
  }

  // we have a keyword to search for
  if (q) {
    const results = db.filter((product) => {
      const { title } = product
      return title.toLowerCase().includes(q.toLowerCase())
    })
    return res.status(200).json(results)
  }

  // we don't have anything
  res.status(400).json()
}
