import { useEffect, useState } from "react"
// import { WS_URL } from "../app/config";
export function useSocket(room:string) {
        
	const [loading, setLoading] = useState(true)
	const [socket, setSocket] = useState<WebSocket>()
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080")
		ws.onopen = () => {
			setLoading(false)
			setSocket(ws)
			const data = JSON.stringify({
				type: "join_room",
				data: {
					timestamp: 1234213123,
					sender: "Ashin",
					room: room,
				},
			})
			ws.send(data)
			const chats = localStorage.getItem("chat")
			if (!chats) {
				localStorage.setItem("chat", JSON.stringify([]))
			}
		}
	}, [])

	return {
		socket,
		loading,
	}
}
