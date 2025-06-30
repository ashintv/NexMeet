
import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createToken } from './accestoke'
dotenv.config()



const app = express()
app.use(cors())
app.use(express.json())

const API_KEY = process.env.LIVEKIT_API_KEY;
const SECRET_KEY = process.env.LIVEKIT_SECRET_KEY;
const LIVEKIT_URL = process.env.LIVEKIT_URL;


app.post('/getToken' ,async (req,res)=>{
        const token = await createToken(req.body.roomname , req.body.identity)
        res.json({
                token
        })
})

app.listen(3000)