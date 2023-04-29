import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'

import { SearchIcon } from './Icons'

const AutocompleteItem = ({ id, title, img, price }) => {
  return (
    <li>
      <Link href={`/detail/${id}`} className='hover:bg-blue-300 flex gap-4 p-4'>
        <img src={img} alt={title} className='w-12 h-12 object-contain' />
        <div>
          <h3 className='text-sm font-semibold'>{title}</h3>
          <p className='text-xs text-gray-600'>{price}</p>
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
    <form ref={formRef} className='border-whop-stroke relative flex w-full max-w-[500px] items-stretch rounded-md border border-solid outline-2 transition' {...formProps}>
      <input
        type='text'
        ref={inputRef} id='txtBuscar' aria-labelledby='txtBuscar' placeholder='Buscar Producto' className='text2 placeholder:text-whop-gray flex-1 rounded-l-md border-none px-3 py-[11px] outline-none' {...inputProps}
      />
      <button className='text-white border-whop-stroke text-whop-dark-gray hover:bg-whop-hover active:bg-whop-hover-press flex items-center rounded-r-md border-0 border-l border-solid bg-[#db1436] px-6 transition'><SearchIcon /></button>
      {
        autocompleteState.isOpen && (
          <div className='absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-50' ref={panelRef} {...autocomplete.getPanelProps()}>
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection
              console.log({ items })
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
