import { Room, RoomServiceClient } from "livekit-server-sdk"
const livekitHost = "https://meet-fstakduf.livekit.cloud"

export const roomService = new RoomServiceClient(
	livekitHost,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_SECRET_KEY
)
