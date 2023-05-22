import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    direccion: ''
  },
  isLogin: false,
  setUser: (nuevoUsuario) =>
    set((state) => ({
      user: {
        ...state.user,
        ...nuevoUsuario
      }
    })),
  setIsLogin: (nuevoEstado) => set(() => ({ isLogin: nuevoEstado }))
}))
