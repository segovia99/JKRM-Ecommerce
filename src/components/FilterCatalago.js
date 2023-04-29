
export default function FilterCatalago () {
  return (
    <div className='lg:w-[270px] categorias'>
      <div className='filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px]  hidden lg:block'>
        <div className='filter-subject-item pb-10 border-b border-qgray-border'>
          <div className='subject-title mb-[30px]'>
            <h1 className='text-black text-base font-500'>Categorias</h1>
          </div>
          <div className='filter-items'>
            <ul>
              <li className='item flex justify-between items-center mb-5'>
                <div className='flex space-x-[14px] items-center'>
                  <div>
                    <input id='herramientas' type='checkbox' name='herramientas' />
                  </div>
                  <div>
                    <label for='herramientas' className='text-xs font-black font-400 capitalize'>Herramientas</label>
                  </div>
                </div>
              </li>
              <li className='item flex justify-between items-center mb-5'>
                <div className='flex space-x-[14px] items-center'>
                  <div>
                    <input id='construccion' type='checkbox' name='construccion' />
                  </div>
                  <div>
                    <label for='construccion' className='text-xs font-black font-400 capitalize'>Materiales de construcción</label>
                  </div>
                </div>
              </li>
              <li className='item flex justify-between items-center mb-5'>
                <div className='flex space-x-[14px] items-center'>
                  <div>
                    <input id='hogar' type='checkbox' name='hogar' />
                  </div>
                  <div>
                    <label for='hogar' className='text-xs font-black font-400 capitalize'>Hogar</label>
                  </div>
                </div>
              </li>
              <li className='item flex justify-between items-center mb-5'>
                <div className='flex space-x-[14px] items-center'>
                  <div>
                    <input id='fontaneria' type='checkbox' name='fontaneria' />
                  </div>
                  <div>
                    <label for='fontaneria' className='text-xs font-black font-400 capitalize'>Fontanería</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}
