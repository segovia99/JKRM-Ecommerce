import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function ReviewForm ({ productId, reviews, setReviews }) {
  const [rating, setRating] = useState(0)
  const nombre = useRef()
  const comentario = useRef()

  const handleSubmit = () => {
    const data = {
      productId,
      nombre: nombre.current.value,
      feedback: comentario.current.value,
      valoracion: rating
    }
    console.log(data)
    if (nombre.current.value === '' || comentario.current.value === '') {
      toast.error('Por favor llene todos los campos')
    } else {
      setReviews([...reviews, data])
      axios.post('/api/review', data)
      setRating(0)
      nombre.current.value = ''
      comentario.current.value = ''
      toast.success('Reseña enviada')
    }
  }
  return (
    <div className='write-review w-full'>
      <h1 className='text-2xl font-medium text-qblack mb-5'>Escribe una reseña</h1>
      <div className='flex space-x-1 items-center mb-[30px]'>
        <Rating
          style={{ maxWidth: 180 }}
          value={rating}
          onChange={setRating}
        />
      </div>
      <div className='w-full review-form '>
        <div className='sm:flex sm:space-x-[30px] items-center mb-5'>
          <div className='sm:w-1/3 w-full'>
            <div className='input-com w-full h-full'>
              <label htmlFor='name' className='input-label capitalize block  mb-2 text-qgray text-[13px] font-normal'>Nombre</label>
              <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative '>
                <input type='text' className='input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-[50px] font-normal bg-white focus:ring-0 focus:outline-none' id='name' ref={nombre} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mb-[30px]'>
          <h6 className='input-label text-qgray capitalize text-[13px] font-normal block mb-2 '>Comentario</h6>
          <textarea cols='30' rows='3' className='w-full focus:ring-0 focus:outline-none p-6' ref={comentario} />
        </div>
        <div className='flex justify-end'>
          <button type='button' className='black-btn w-[300px] h-[50px]  flex justify-center' onClick={() => handleSubmit()}>
            <span className='flex space-x-1 items-center h-full'>
              <span className='text-sm font-semibold'>Enviar Reseña</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
