import { create } from 'zustand'

export const useWishlistStore = create((set) => ({
  items: 0,
  setItems: (nuevoEstado) => set(() => ({ items: nuevoEstado }))
}))
