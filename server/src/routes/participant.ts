import express from "express"
import { roomService } from "../config/livekit"
export const ParticipantRouter = express.Router()




//get all participants in a room
ParticipantRouter.get("/:roomname", async (req, res) => {
	const roomName = req.params.roomname
	try {
		const response = await roomService.listParticipants(roomName)
		res.json({
			particpants: response,
		})
	} catch (err: any) {
		console.error("Failed to list rooms:", err.message)
		res.status(500).json({ error: "Failed to list participants", roomname: roomName })
	}
})

//get a specific paticipant
ParticipantRouter.get("/:roomname/:identity", async (req, res) => {
	const roomName = req.params.roomname
	const identity = req.params.identity
	try {
		const response = await roomService.getParticipant(roomName, identity)
	} catch (err: any) {
		console.error("Failed to list rooms:", err.message)
		res.status(500).json({ error: "Failed to get participant ", identity })
	}
})

//update a participant
ParticipantRouter.post("/:roomname/:identity", async (req, res) => {
        const roomName = req.params.roomname
	const identity = req.params.identity
	try {
		await roomService.updateParticipant(roomName, identity, undefined, {
			canPublish: req.body.canPublish,
			canSubscribe: req.body.canSubscribe,
			canPublishData: req.body.canPublishData,
		})
		//return json
		res.json({
			msge: `particapant ${req.params.identity} updated`,
			new: {
				canPublish: req.body.canPublish,
				canSubscribe: req.body.canSubscribe,
				canPublishData: req.body.canPublishData,
			},
		})
	} catch (err: any) {
		console.error("Failed to list rooms:", err.message)
		res.status(500).json({ error: "Failed to update participant ", identity  , roomname:roomName})
	}
})

//remove / delete a particpant
ParticipantRouter.delete("/:roomname/:identity", async (req, res) => {
	const roomName = req.params.roomname
	const identity = req.params.identity
	try{
                await roomService.removeParticipant(roomName, identity)
        }catch (err: any) {
		console.error("Failed to list rooms:", err.message)
		res.status(500).json({ error: "Failed to remove participant ", identity  , roomname:roomName})
	}
})
