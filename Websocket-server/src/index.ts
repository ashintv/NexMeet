import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"
const wss = new WebSocketServer({ port: 8080 })

const UserMap = new Map<string, Set<WebSocket>>()
const ChatMap = new Map<string, string[]>()

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
		if (Message.type == "join_room") {
			if (!UserMap.get(Message.data.room)) {
				
				UserMap.set(Message.data.room, new Set())
				console.log(`No Room exist for ${Message.data.room} created`, UserMap)
			}
			UserMap.get(Message.data.room)!.add(ws)
			if (!ChatMap.get(Message.data.room)) {
				ChatMap.set(Message.data.room, [])
				console.log(`No Chat hitory exist for ${Message.data.room} created`, ChatMap)
				
			} else {
				const messages =  ChatMap.get(Message.data.room)
				console.log(`Sending history of ${Message.data.room}`)
				ws.send(JSON.stringify({
					type :'history',
					history:messages
				}))
				
			}
			
			
		}

		if (Message.type == "chat") {
			const participants = UserMap.get(Message.data.room)
			ChatMap.get(Message.data.room)!.push(JSON.stringify(Message))
			if (!participants) {
				console.log("no participant")
				return
			}
			participants.forEach((socket) => {
				socket.send(JSON.stringify(Message))
			})
		}


		if(Message.type == 'leave_room'){
			UserMap.get(Message.data.room)?.delete(ws)
			console.log(`Memeber leaved from ${Message.data.room} current Users`, UserMap)
			// if everyone leaves
			if (UserMap.get(Message.data.room)?.size==0){
				
				console.log( `room ${Message.data.room} becomes empty clearing it from Map`, UserMap)
				console.log( "clearing its chat history", ChatMap)


				UserMap.delete(Message.data.room)
				ChatMap.delete(Message.data.room)

				console.log(`Cleared ${Message.data.room} current Map is :`,UserMap)
				console.log( `Cleared Chats of ${Message.data.room} current Chats `, ChatMap)


			}
		}

	})
})
