import express from "express"
import { Room, RoomServiceClient } from "livekit-server-sdk"
const livekitHost = "https://meet-fstakduf.livekit.cloud"
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_SECRET_KEY
)

export const RoomRouter = express.Router()

RoomRouter.post("/", async (req, res) => {
  const opts = {
    name: req.body.roomname,
    emptyTimeout: 10 * 60, // 10 minutes
    maxParticipants: 20,
  }
  const room = await roomService.createRoom(opts)
  res.json({
    room,
  })
})

RoomRouter.get("/", async (req, res) => {
  try {
    const rooms = await roomService.listRooms()
    res.json({ rooms })
  } catch (err: any) {
    console.error("Failed to list rooms:", err.message)
    res.status(500).json({ error: "Failed to list rooms" })
  }
}) 



RoomRouter.delete("/", async (req, res) => {
  console.log("rooms delete")
  try {
   await  roomService.deleteRoom(req.body.roomname)
   res.json({
    msg: `room deleted ${req.body.roomname}`
   })
  } catch (err: any) {
    console.error("Failed to delete room:", err.message)
    res.status(500).json({ error: "Failed to delete room" })
  }
})
