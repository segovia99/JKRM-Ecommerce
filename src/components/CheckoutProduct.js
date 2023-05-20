
export default function CheckoutProduct ({ cart }) {
  return (
    <ul className='flex flex-col space-y-5'>
      {
         cart.map(item => (
           <li key={item.id}>
             <div className='flex justify-between items-center'>
               <div>
                 <h4 className='text-[15px] text-qblack mb-2.5'>
                   {item.nombre}
                   <sub className='text-[13px] text-qgray ml-2 mt-2'>x{item.quantity}</sub>
                 </h4>
               </div>
               <div>
                 <span className='text-[15px] text-qblack font-medium'>${item.subtotal}</span>
               </div>
             </div>
           </li>
         ))
        }
    </ul>
  )
}
