import { Rating } from '@smastrom/react-rating'
import Avatar from './Avatar'

export default function ReviewCard ({ review }) {
  const { nombre, feedback, valoracion } = review
  return (
    <div className='comment-item bg-white px-10 py-[32px] mb-2.5'>
      <div className='comment-author flex justify-between items-center mb-3'>
        <div className='flex space-x-3 items-center'>
          <Avatar letra='k' />
          <div>
            <p className='text-[18px] font-medium text-qblack'>{nombre}</p>

          </div>
        </div>
        <Rating
          style={{ maxWidth: 100 }}
          value={valoracion}
          readOnly
        />
      </div>
      <div className='comment mb-[30px]'>
        <p className='text-[15px] text-qgray leading-7 text-normal'>{feedback}</p>
      </div>
    </div>
  )
}
