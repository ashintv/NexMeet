import { create } from 'zustand'

export const useChatbox= create<CreateFormState>((set) => ({
  chatBox:false,
  setChatbox: (value:boolean) => set({ chatBox:value }),
}))

interface CreateFormState {
  chatBox: boolean
  setChatbox: (value: boolean) => void
}