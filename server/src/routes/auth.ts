import express from 'express'
import {z} from 'zod'
import { UserSchema } from '../types/user'
import { UserModel } from '../db'
export const AuthRouter  =  express.Router()

AuthRouter.post('/signup' ,async (req, res)=>{

        const Parse  = UserSchema.safeParse(req.body)
        if(Parse.error){
                res.status(400).json({
                        err:"ivalid data format"
                })
                return
        }
        try{
                const user  = await UserModel.create({
                        username:Parse.data.username,
                        password:Parse.data.password // password should be hased
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