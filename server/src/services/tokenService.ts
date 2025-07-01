import { AccessToken, VideoGrant } from "livekit-server-sdk"
export const createToken = async (roomname: string, identity: string , grant:VideoGrant) => {
	const roomName = roomname
	const ParticipantName = identity
	const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
		identity: ParticipantName,
		ttl: "10m",
	})
	at.addGrant(grant)
	return await at.toJwt()
}
