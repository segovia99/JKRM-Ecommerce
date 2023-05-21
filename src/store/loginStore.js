import { create } from 'zustand'

export const useIsLogin = create((set) => ({
  isLogin: false,
  setIsLogin: (nuevo) => set((state) => ({ isLogin: nuevo }))
}))
