if (typeof window !== 'undefined') {
  const toggleModalButtons = document.querySelectorAll('[data-modal-toggle]')
  const showModalButtons = document.querySelectorAll('[data-modal-show]')
  const hideModalButtons = document.querySelectorAll('[data-modal-hide]')

  toggleModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(`#${button.dataset.modalTarget}`)
      toggleModal(modal)
    })
  })

  showModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(`#${button.dataset.modalShow}`)
      showModal(modal)
    })
  })

  hideModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(`#${button.dataset.modalHide}`)
      hideModal(modal)
    })
  })

  function toggleModal (modal) {
    if (modal == null) return
    modal.classList.toggle('hidden')
  }

  function showModal (modal) {
    if (modal == null) return
    modal.classList.remove('hidden')
  }

  function hideModal (modal) {
    if (modal == null) return
    modal.classList.add('hidden')
  }
}
