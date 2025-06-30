import { AccessToken } from "livekit-server-sdk";
import express from "express";
export const createToken = async (roomname: string, identity: string) => {
    const roomName = roomname;
    const ParticipantName = identity;
    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
            identity: ParticipantName,
            ttl: "10m",
        }
    );
    at.addGrant({ roomJoin: true, room: roomName });
    return await at.toJwt();
};

export const TokenRouter = express.Router();
TokenRouter.post("/", async (req, res) => {
    const token = await createToken(req.body.roomname, req.body.identity);
    res.json({
        token,
    });
});
