import { create } from "zustand"
interface User {
	Name: string
	email: string
}

interface UserData {
	Name: string
	email: string
	setUserData: (value: User) => void
}

export const useUserData = create<UserData>((set) => ({
	Name: "",
	email: "",
	setUserData: (value: User) => set({ Name: value.Name, email: value.email }),
}))
