import express from 'express'
import {z} from 'zod'
import { UserSchema } from '../types/user'
import { UserModel } from '../db'
import bcrypt from "bcrypt"


export const AuthRouter  =  express.Router()


AuthRouter.post('/signup' ,async (req, res)=>{

        const Parse  = UserSchema.safeParse(req.body)
        if(!Parse.success){
                console.error(Parse.error)
                res.status(400).json({
                        err:"ivalid data format"
                })
                return
        }

        try{
                const password = await  bcrypt.hash(process.env.BCRYPT_SECRET! ,  5)
                const user  = await UserModel.create({
                        username:Parse.data.username,
                        password:password // password should be hased
                })
                res.json({
                        user
                })
        }
        catch(e){
                console.error(e)
                res.status(400).json({
                        'err': 'unable to save user details'
                })
        }
       
})