import express from "express"
import { createToken } from "../services/tokenService"

export const TokenRouter = express.Router()
TokenRouter.post("/", async (req, res) => {
	const token = await createToken(req.body.roomname, req.body.identity)
	res.json({
		token,
	})
})
