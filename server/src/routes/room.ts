import { GrantModel } from "./../db"
import express from "express"
import { roomService } from "../config/livekit"
import { CreateOptions, VideoGrant } from "livekit-server-sdk"
import { RoomSchema } from "../types/room"
import { authMiddlewares } from "../middlewares/auth"


export const RoomRouter = express.Router()

// create a room
RoomRouter.post("/",authMiddlewares, async (req, res) => {
	const opts: CreateOptions = {
		name: req.body.roomname, // should be randomly gernarted
		emptyTimeout: 10 * 60, // 10 minutes
		maxParticipants: 20,
		metadata: req.body.roomname,
	}
	try {
		const Parse = RoomSchema.safeParse(req.body)
		if (Parse.error) {
			res.status(400).json({
				err: "ivalid format",
			})
			return
		}
		//@ts-ignore
		console.log(req.userId)
		await GrantModel.create({
			//@ts-ignore
			creatorID: req.userId,
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
