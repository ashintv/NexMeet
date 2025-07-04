import { RoomModel } from "./../db"
import express from "express"
import { roomService } from "../config/livekit"
import { CreateOptions, VideoGrant } from "livekit-server-sdk"
import { RoomSchema } from "../types/room"

export var PvideoGrant: VideoGrant | null = null
export const RoomRouter = express.Router()

// create a room
RoomRouter.post("/", async (req, res) => {
	const opts: CreateOptions = {
		name: req.body.roomname, // should be randomly gernarted
		emptyTimeout: 10 * 60, // 10 minutes
		maxParticipants: 20,
		metadata: req.body.roomname,
	}
	// PvideoGrant={
	// 	roomJoin: true,
	// 	room: req.body.roomname,
	// 	canSubscribe: req.body.pctSub,
	// 	canPublish: req.body.pctPub,
	// }

	try {
		const Parse = RoomSchema.safeParse(req.body)
		if (Parse.error) {
			res.status(400).json({
				err: "ivalid format",
			})
		}
		await RoomModel.create({
			creatorID: req.body.creatorID,
			roomJoin: true,
			roomname: req.body.roomname,
			Name: req.body.Roomname,
			pctPub: req.body.pctPub,
			pctSub: req.body.pctSub,
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({
			err: "unable to save Meeting/room settings",
		})
	}
	const room = await roomService.createRoom(opts)
	res.json({
		room,
	})
})

//list all existing rooms
RoomRouter.get("/", async (req, res) => {
	try {
		const rooms = await roomService.listRooms()
		res.json({ rooms })
	} catch (err: any) {
		console.error("Failed to list rooms:", err.message)
		res.status(500).json({ error: "Failed to list rooms" })
	}
})

// delete a room
RoomRouter.delete("/", async (req, res) => {
	try {
		await roomService.deleteRoom(req.body.roomname)
		res.json({
			msg: `room deleted ${req.body.roomname}`,
		})
	} catch (err: any) {
		console.error("Failed to delete room:", err.message)
		res.status(500).json({ error: "Failed to delete room" })
	}
})
