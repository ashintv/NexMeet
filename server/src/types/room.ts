import { z } from "zod"

export const RoomSchema = z.object({
	creatorID: z.string(),
	roomname: z.string(),
	roomJoin: z.boolean(),
	Name:z.string(),
	pctSub: z.boolean(),
	pctPub: z.boolean(),
})
