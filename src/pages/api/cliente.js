import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { id } = req.body
    const [cliente] = await pool.query('SELECT nombre, apellido, direccion FROM usuarios WHERE id=?', [id])
    const response = {
      nombre: cliente[0].nombre,
      apellido: cliente[0].apellido,
      direccion: cliente[0].direccion
    }
    res.status(200).json(response)
  }
}
