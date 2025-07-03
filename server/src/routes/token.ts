import express from "express"
import { createToken } from "../services/tokenService"
import { TrackSource, VideoGrant } from "livekit-server-sdk"
import { PvideoGrant } from "./room"


// token for particpants
export const TokenRouter = express.Router()
TokenRouter.post("/participant", async (req, res) => {
	const roomName = req.body.roomname
	const identity = req.body.identity
	const grant = PvideoGrant
	if(!grant){
		res.status(400).json({
			msg:"meeting not exists"
			
		})
		return
	}
	const token = await createToken(req.body.roomname, req.body.identity, grant)
	res.json({
		token,
	})
})


// token for co host (if needed)
TokenRouter.post("/moderator", async (req, res) => {
	const roomName = req.body.roomname
	const identity = req.body.identity
	const grant = {
		roomJoin: true,
		room: roomName,
		roomAdmin: true,
		canPublish: false,
		canSubscribe: true,
		canPublishData: false,
	}
	const token = await createToken(req.body.roomname, req.body.identity, grant)
	res.json({
		token,
	})
})

// token for host
TokenRouter.post("/host", async (req, res) => {
	const roomName = req.body.roomname
	const identity = req.body.identity
	const grant: VideoGrant= {
		roomCreate:true,
		roomAdmin:true,
		roomJoin: true,
		room: roomName,
		canPublish: true,
		canSubscribe: true,
		canPublishData: true,
		canPublishSources:[TrackSource.CAMERA , TrackSource.MICROPHONE , TrackSource.SCREEN_SHARE , TrackSource.SCREEN_SHARE_AUDIO]
	}
	const token = await createToken(req.body.roomname, req.body.identity , grant)
	res.json({
		token,
	})
})
