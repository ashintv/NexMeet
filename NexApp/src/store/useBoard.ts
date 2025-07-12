import { create } from 'zustand'

export const useBoard= create<useBoardState>((set) => ({
  Board:false,
  setBoard: (value:boolean) => set({ Board:value }),
}))

interface useBoardState{
  Board: boolean
  setBoard: (value: boolean) => void
}