import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { pool } from '@/db/db'
import { API_KEY, API_SECRET, CLOUD_NAME } from '@/services/config'

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

// set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler (req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = formidable({})

    form.parse(req, (err, fields, files) => {
    //  if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })

  const { files } = data
  const image = files.image
  // console.log(image)

  await cloudinary.uploader.destroy('zpwdstmxmhyz9vhwp9mr')
  // console.log(resp)

  const response = await cloudinary.uploader.upload(image[0].filepath, { public_id: 'zpwdstmxmhyz9vhwp9mr' })

  if (response) {
    await pool.query('UPDATE banners SET url=? where id=1', [response.secure_url])
  }

  res.status(200).json({
    status: 'ok',
    message: 'Imagen subida con exito'
  })
}
