import {
	ControlBar,
	GridLayout,
	ParticipantTile,
	RoomAudioRenderer,
	useTracks,
	RoomContext,
} from "@livekit/components-react"
import { Room, Track } from "livekit-client"
import "@livekit/components-styles"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { userStore } from "@/store/useuserdata"
import { BACKEND_URL } from "@/config"
import { Toaster, toast } from "sonner"
import { CopyCode } from "@/components/ui/copytoaster"
import { useSocket } from "@/hooks/useChat"
import { Chat } from "@/components/chat"
import { useChatbox } from "@/store/useChatbox"
import { Button } from "@/components/ui/button"
import { ChatIcon } from "@/icons/chat"
import { Canvas } from "@/components/canvas/canvas"
import type { ShapeType } from "@/components/canvas/types"
import { useBoard } from "@/store/useBoard"

const serverUrl = "wss://meet-fstakduf.livekit.cloud"
export function HMeeting() {
	const [shapes, setShape] = useState<ShapeType[]>([])
	const { joinid } = useParams()
	const { socket, chats } = useSocket(joinid!, setShape, shapes)
	// const { chats  } = useChating(socket! , loading)
	const chatbox = useChatbox()
	const board = useBoard()
	const { email } = userStore.getState().user
	const [room] = useState(
		() =>
			new Room({
				adaptiveStream: true,
				dynacast: true,
			})
	)
	useEffect(() => {
		console.log(chats)
	}, [chats])

	// Connect to room
	useEffect(() => {
		let mounted = true
		const connect = async () => {
			if (mounted) {
				try {
					const response = await axios.post(
						BACKEND_URL + "/token/host",
						{
							identity: email,
							roomname: joinid,
						},
						{
							headers: {
								authorization: localStorage.getItem("token"),
							},
						}
					)
					await room.connect(serverUrl, response.data.token)
				} catch (err: any) {
					if (err.response && err.response.data && err.response.data.err) {
						toast.error(err.response.data.err)
					} else {
						toast.error("Something went wrong")
					}
				}
			}
		}
		connect()
		return () => {
			mounted = false
			room.disconnect()
		}
	}, [room])

	return (
		<div className={`bg-black ${board.Board && "flex"}`}>
			{board.Board && (
				<Canvas shapes={shapes} setShape={setShape} joinid={joinid!} socket={socket!} />
			)}

			<RoomContext.Provider value={room}>
				<div data-lk-theme="default">
					{/* Your custom component with basic video conferencing functionality. */}
					<MyVideoConference />
					{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
					<RoomAudioRenderer />
					{/* Controls for the user to start/stop audio, video, and screen share tracks */}

					<ControlBar />
				</div>
			</RoomContext.Provider>

			<div
				className={`fixed flex  gap-1 rounded-xl  border-2 p-1 border-primary ${
					board.Board ? "flex-col-reverse  right-2 bottom-2" : "bottom-2 right-2 "
				}`}>
				<CopyCode id={joinid ? joinid : ""} />
				<Button
					variant={"ghost"}
					className="text-primary hover:bg-primary"
					onClick={() => chatbox.setChatbox(!chatbox.chatBox)}>
					<ChatIcon />
				</Button>
				<Button
					onClick={() => {
						socket?.send(
							JSON.stringify({
								type: "board",
								data: {
									room: joinid,
									open:!board.Board
								},
							})
						)
					}}>
					B
				</Button>
			</div>

			<Toaster position={"top-center"} />
			{chatbox.chatBox && (
				<div className="fixed flex  top-5 right-5">
					<Chat chats={chats} socket={socket!} room={joinid!} />
				</div>
			)}
		</div>
	)
}

function MyVideoConference() {
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	)
	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
			<ParticipantTile className="border-2 border-primary " />
		</GridLayout>
	)
}
