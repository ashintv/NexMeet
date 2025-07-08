
import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
const wss = new WebSocketServer({ port: 8080 })

interface User{
	name:string | any,
	ws:WebSocket,
	room:string
}
const Users : User[] = []


wss.on("connection", function connection(ws, request) {
	console.log("user connected")

	ws.on("message", async function message(data) {
		const Message = JSON.parse(data.toString())
		console.log(Message)
		
		// add user in rooms
		if (Message.type == 'join_room'){
			Users.push({
				name:Message.data.sender,
				ws:ws,
				room:Message.data.room

			})
			console.log(Users)
		}

		// chating

		
		if (Message.type == 'chat'){
			Users.forEach((user)=>{
				
				if (user.room === Message.data.room){
					console.log(user)
					user.ws.send(JSON.stringify(Message))
				 }
			}

			)
		}
		
		
	})
})



