// store/useUser.ts
import {  createStore } from "zustand"
import { persist } from "zustand/middleware"

type userStoreState = {
	user: {
		name: string
		email: string
	}
}

type userStoreActions = {
	setUser: (user: userStoreState["user"]) => void
}
export type userState = userStoreState & userStoreActions
export const userStore = createStore<userState>()(
	persist(
		(set) => ({
			user: {
				email: "",
				name: "",
			},
			setUser: (user) => set({ user }),
		}),
		{
			name: "user-storage",
		}
	)
)
