import { create } from 'zustand'

export const useIsLogin = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: true }))
}))
