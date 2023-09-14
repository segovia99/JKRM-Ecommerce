import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'

import { SearchIcon } from './Icons'
import { useAdmin } from '@/hooks/useAdmin'

const AutocompleteItem = ({ id, nombre, url, precio }) => {
  const { setIsOpen } = useAdmin()
  const close = (e) => {
    setIsOpen(false)
  }
  return (
    <li onClick={() => close()}>
      <Link href={`/detail/${id}`} className='hover:bg-blue-300 flex gap-4 p-4'>
        <img src={url} alt={nombre} className='w-12 h-12 object-contain' />
        <div>
          <h3 className='text-sm font-semibold'>{nombre}</h3>
          <p className='text-xs text-gray-600'>${precio}</p>
        </div>
      </Link>
    </li>
  )
}

function Search (props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Buscar Producto',
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'product-next-api',
      getItems: ({ query }) => {
        if (query) {
          return fetch(`/api/search?q=${query}`)
            .then(res => res.json())
        }
      }
    }],
    ...props
  }), [props])

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <form ref={formRef} className='border-whop-stroke relative flex w-full items-stretch rounded-md border border-solid outline-2 transition' {...formProps}>
      <input
        type='text'
        ref={inputRef} id='txtBuscar' aria-labelledby='txtBuscar' placeholder='Buscar Producto' className='text2 placeholder:text-whop-gray flex-1 rounded-l-md border-none px-3 py-[11px] outline-none' {...inputProps}
      />
      <span className='text-white border-whop-stroke text-whop-dark-gray hover:bg-whop-hover active:bg-whop-hover-press flex items-center rounded-r-md border-0 border-l border-solid bg-[#db1436] px-2 transition'><SearchIcon /></span>
      {/* <button className='text-white border-whop-stroke text-whop-dark-gray hover:bg-whop-hover active:bg-whop-hover-press flex items-center rounded-r-md border-0 border-l border-solid bg-[#db1436] px-6 transition'><SearchIcon /></button> */}
      {
        autocompleteState.isOpen && (
          <div className='absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-50' ref={panelRef} {...autocomplete.getPanelProps()}>
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {
                        items.map(item => <AutocompleteItem key={item.id} {...item} />)
                      }
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )
      }
    </form>
  )
}

export default Search
