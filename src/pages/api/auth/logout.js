import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function handler (req, res) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    verify(token, 'jkrm')
    const serealized = serialize('token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'

    })
    res.setHeader('Set-Cookie', serealized)
    res.status(200).json({ message: 'Logged out' })
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
