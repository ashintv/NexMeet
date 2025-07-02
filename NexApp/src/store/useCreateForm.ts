import { create } from 'zustand'

export const useCreateForm = create<CreateFormState>((set) => ({
  visible:false,
  setVisible: (value:boolean) => set({ visible:value }),
}))

interface CreateFormState {
  visible: boolean
  setVisible: (value: boolean) => void
}