import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT * FROM banners')
    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    res.status(400)
  }
}
