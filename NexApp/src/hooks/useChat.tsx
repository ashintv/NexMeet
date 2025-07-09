import { userStore } from "@/store/useuserdata"
import { useEffect, useState } from "react"
// import { WS_URL } from "../app/config";
export function useSocket(room: string) {
	const { name } = userStore.getState().user
	const [loading, setLoading] = useState(true)
	const [socket, setSocket] = useState<WebSocket>()
	const [chats, setChats] = useState<any[]>([])
	useEffect(() => {
		setLoading(true)
		const ws = new WebSocket("ws://localhost:8080")
		ws.onopen = () => {
			setLoading(false)
			setSocket(ws)
			const data = JSON.stringify({
				type: "join_room",
				data: {
					sender: name,
					room: room,
				},
			})
			ws.send(data)
			ws.onmessage = (event) => {
				const Data = JSON.parse(event.data)
				console.log(Data)
				if (Data.type == "chat") {
					setChats((prevChats) => [...prevChats, Data])
				}

				if (Data.type == "history") {
					//@ts-ignore
					const parsed = Data.history.map((x) => JSON.parse(x))
					console.log({
						parsed,
						chats,
					})
					setChats(parsed)
					console.log(chats, parsed)
				}
			}
		}
                return ()=>{
                        ws.send(JSON.stringify({
                                type:"leave_room",
                                data:{
                                        room:room
                                }
                        }))
                }
	}, [])

	return {
		socket,
		loading,
		chats,
	}
}
