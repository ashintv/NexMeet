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
import { useParams } from "react-router"
import { userStore } from "@/store/useuserdata"
import { BACKEND_URL } from "@/config"
import { useSocket } from "@/hooks/useChat"
import { useChating } from "@/hooks/useChating"
import { Chat } from "@/components/chat"
import { Button } from "@/components/ui/button"
import { useChatbox } from "@/store/useChatbox"
import { ChatIcon } from "@/icons/chat"

const serverUrl = "wss://meet-fstakduf.livekit.cloud"
export function PMeeting() {
	const { email } = userStore.getState().user
        const chatbox = useChatbox()
	const [room] = useState(
		() =>
			new Room({
				adaptiveStream: true,
				dynacast: true,
			})
	)
	let params = useParams()
	const { socket } = useSocket(params.joinid!)
	const { chats } = useChating(socket!)
	// Connect to room
	useEffect(() => {
		let mounted = true
		const connect = async () => {
			if (mounted) {
				const response = await axios.post(
					BACKEND_URL + "/token/participant",
					{
						identity: email,
						roomname: params.joinid,
					},
					{
						headers: {
							authorization: localStorage.getItem("token"),
						},
					}
				)
				await room.connect(serverUrl, response.data.token)
			}
		}
		connect()
		return () => {
			mounted = false
			room.disconnect()
		}
	}, [room])

	return (
		<>
			<RoomContext.Provider value={room}>
				<div data-lk-theme="default">
					{/* Your custom component with basic video conferencing functionality. */}
					<MyVideoConference />
					{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
					<RoomAudioRenderer />
					{/* Controls for the user to start/stop audio, video, and screen share tracks */}
					<ControlBar className="" />
				</div>
			</RoomContext.Provider>
                        <div className="fixed flex gap-5 bottom-2 right-2 rounded-xl border-2 p-2 border-primary">
	
				<Button variant={"ghost"} className="text-primary hover:bg-primary" onClick={()=>

					chatbox.setChatbox(!chatbox.chatBox)
				}><ChatIcon/></Button>
			</div>
			{chatbox.chatBox && <div className="fixed flex  top-5 right-5">
				<Chat chats={chats} socket={socket!} room={params.joinid!}/>
			</div>}
		</>
	)
}

function MyVideoConference() {
	// `useTracks` returns all camera and screen share tracks. If a user
	// joins without a published camera track, a placeholder track is returned.
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
			{/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
			<ParticipantTile className="border-2 border-primary" />
		</GridLayout>
	)
}
