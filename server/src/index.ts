import { ParticipantRouter } from './routes/participant';
import mongoose from 'mongoose'
import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {  TokenRouter } from './routes/token'
import { RoomRouter } from './routes/room'
import { AuthRouter } from './routes/auth';
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())



// app.use('/' , indexRouter)
app.use('/' , AuthRouter)
app.use('/token' ,TokenRouter)
app.use('/rooms' , RoomRouter)
app.use('/participants' , ParticipantRouter)



try{
        mongoose.connect(process.env.DB_URI!)
        app.listen(3001)

}catch(e){
        console.error('Unable to start Server :' , e)
}