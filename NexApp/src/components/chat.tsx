import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ChatBubbleR, ChatBubbleS } from "./ui/chatbubble"
import { Textarea } from "./ui/textarea"
import { userStore } from "@/store/useuserdata"
import { ScrollArea } from "@radix-ui/react-scroll-area"


export function Chat(props: ChatProps) {
	const [message, setMessage] = useState("")
	const sender = userStore.getState().user.name
	const bottomRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [props.chats]) // Scro
	function sendMessage() {
		if (!message.trim()) return
		const date = new Date()

		const timeString = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		})

		
		props.socket.send(
			JSON.stringify({
				type: "chat",
				data: {
					message: message,
					timestamp: timeString,
					sender: sender,
					room: props.room,
				},
			})
		)
		setMessage("")
	}
	return (
		<div className="bg-transparent backdrop-blur-xl w-94 h-150 rounded-2xl border border-primary p-5">
			<div className="relative h-full">
				<div className="">
					<ScrollArea className="overflow-y-scroll h-[400px]">
						<div className="p-2 space-y-2">
							{props.chats.map((x, idx) =>
								x.sender === sender ? (
									<ChatBubbleS
										key={idx}
										message={x.message}
										author={x.sender}
										timestamp={x.timestamp}
									/>
								) : (
									<ChatBubbleR
										key={idx}
										message={x.message}
										author={x.sender}
										timestamp={x.timestamp}
									/>
								)
							)}
							<div ref={bottomRef} />
						</div>
					</ScrollArea>
				</div>

				<div className="absolute bottom-0 gap-2 bg-background outline  p-1 rounded-2xl w-full">
					<Textarea
						className="border-0"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value)
						}}></Textarea>
					<div className="flex justify-end p-2">
						<Button onClick={sendMessage}>Send</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

interface ChatProps {
	chats: any[]
	socket: WebSocket
	room: string
}
