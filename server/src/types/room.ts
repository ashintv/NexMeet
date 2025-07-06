import { z } from "zod"

export const RoomSchema = z.object({
	roomJoin: z.boolean(),
	Name:z.string(),
	pctSub: z.boolean(),
	pctPub: z.boolean(),
})
