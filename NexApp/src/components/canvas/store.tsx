import { create } from "zustand"
import type { ShapeType, ToolsType } from "./types"

interface useToolsState {
	tool: ToolsType
	setTool: (value: ToolsType) => void
}

export const useTools = create<useToolsState>((set) => ({
	tool: "RECT",
	setTool: (value) => set({ tool: value }),
}))

// store/useShapesStore.ts

