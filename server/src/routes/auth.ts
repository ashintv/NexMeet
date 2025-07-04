import express from "express"
import { z } from "zod"
import { UserSchema } from "../types/user"
import { UserModel } from "../db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const AuthRouter = express.Router()

AuthRouter.post("/signup", async (req, res) => {
	const Parse = UserSchema.safeParse(req.body)
	if (!Parse.success) {
		console.error(Parse.error)
		res.status(400).json({
			err: "ivalid data format",
		})
		return
	}
	try {
		const password = await bcrypt.hash(req.body.password, 5)
		const user = await UserModel.create({
			username: Parse.data.username,
			password: password, 
		})
		res.json({
			user,
		})
	} catch (e) {
		console.error(e)
		res.status(400).json({
			err: "unable to save user details",
		})
	}
})

AuthRouter.get("/signin", async (req, res) => {
	const Parse = UserSchema.safeParse(req.body)
	if (!Parse.success) {
		res.status(400).json({
			err: "invalide format",
		})
		return
	}
	try {
		const user = await UserModel.findOne({
			username: req.body.username,
		})
		if (!user) {
			res.status(400).json({
				err: "user does not exist",
			})
			return
		}
                //@ts-ignore
		const verify = await bcrypt.compare(req.body.password,user.password)
                console.log(verify)
		if (!verify) {
			res.status(400).json({
				err: "wrong password",
			})
			return
		}
		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET!
		)
                res.json({
                        token
                })
	} catch (e) {
		console.error(e)
		res.status(400).json({
			err: "sigin failed",
		})
		return
	}
})
