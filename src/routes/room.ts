import express from "express";
import { Room, RoomServiceClient } from "livekit-server-sdk";
const livekitHost = "https://meet-fstakduf.livekit.cloud";
const roomService = new RoomServiceClient(
    livekitHost,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_SECRET_KEY
);

export const RoomRouter = express.Router();

RoomRouter.get("/", (req, res) => {});


RoomRouter.post("/", async (req, res) => {
    const opts = {
        name: 'my-test-toom',
        emptyTimeout: 10 * 60, // 10 minutes
        maxParticipants: 20,
    };
    const room =await roomService.createRoom(opts)
    console.log('room created' , room)
    res.json({
        room
    })
});
