import db from 'db.json'

export default function handler (req, res) {
  if (req.method === 'GET') {
    res.status(200).json(db)
  }

  if (req.method === 'POST') {
    res.status(400)
  }
}
