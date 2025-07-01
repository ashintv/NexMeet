import { ParticipantRouter } from './routes/participant';

import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {  TokenRouter } from './routes/token'
import { RoomRouter } from './routes/room'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// const API_KEY = process.env.LIVEKIT_API_KEY;
// const SECRET_KEY = process.env.LIVEKIT_SECRET_KEY;
// const LIVEKIT_URL = process.env.LIVEKIT_URL;


app.use('/token' ,TokenRouter)
app.use('/rooms' , RoomRouter)
app.use('/participants' , ParticipantRouter)

app.listen(3001)