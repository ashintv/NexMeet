import { AccessToken} from "livekit-server-sdk"

export const createToken = async (roomname:string  , identity:string) =>{
        const roomName = roomname
        const ParticipantName = identity
        const at  = new AccessToken(
                process.env.LIVEKIT_API_KEY,
                process.env.LIVEKIT_API_SECRET,{
                        identity:ParticipantName,
                        ttl:'10m'
                }
        )
        at.addGrant({roomJoin:true , room:roomName})
        return await at.toJwt();
}