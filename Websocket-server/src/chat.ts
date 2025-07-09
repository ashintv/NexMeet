import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"
const wss = new WebSocketServer({ port: 8080 })

const UserMap = new Map<string, Set<WebSocket>>()

wss.on("connection", function connection(ws, request) {
	// console.log("user initaited connection")
	// const token = request.headers["authorization"]
	// if (!token) {
	// 	console.log("No token provided")
	// 	ws.close(4001, "token not provided")
	// 	return null
	// }
	// try {
	// 	const verify = jwt.verify(token, JWT_SECRET!)
	// 	if (!verify) {
	// 		console.log("user not verified")
	// 		ws.close(4002, "invalid token")
	// 		return null
	// 	}
	// } catch (e) {
	// 	console.log(e)
	// 	ws.close(4002, "invalid token")
	// 	return null
	// }
	ws.on("message", async function message(data) {
		const Message = JSON.parse(data.toString())
		console.log(message)

		if (Message.type == "join_room") {
			if (!UserMap.get(Message.data.room)) {
				UserMap.set(Message.data.room, new Set())
			}
			UserMap.get(Message.data.room)!.add(ws)
			console.log(UserMap)
		}

		if (Message.type == "chat") {
			const participants = UserMap.get(Message.data.room)

			if (!participants) {
				console.log("no participant")
				return
			}
			participants.forEach((socket) => {
				socket.send(JSON.stringify(Message))
			})
		}
	})
})
