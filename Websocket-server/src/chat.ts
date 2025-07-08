import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
const wss = new WebSocketServer({ port: 8080 })

const UserMap = new Map<string, Set<WebSocket>>()

wss.on("connection", function connection(ws, request) {
	console.log("user connected")

	ws.on("message", async function message(data) {
		const Message = JSON.parse(data.toString())
		
		if (Message.type == "join_room") {
			// using map for room
			if (!UserMap.get(Message.data.room)) {
				UserMap.set(Message.data.room, new Set())
			}
			UserMap.get(Message.data.room)!.add(ws)
			console.log(UserMap)

		}

		if (Message.type == "chat") {
			const participants = UserMap.get(Message.data.room)

			if(!participants) {
				console.log("no participant")
				return;
			}
			participants.forEach((socket) => {
				socket.send(JSON.stringify(Message))
			})
		}
	})
})
