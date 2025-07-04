import { NextFunction, Request, Response } from "express";
import  jwt, { verify } from "jsonwebtoken"
export function authMiddlewares(req:Request ,  res:Response , next:NextFunction ){
        try{
                const token = req.headers['authorization']
                if(!token){
                        res.status(400).json({
                                msg:'user not authenticated please login again'
                        })
                        return
                }
                const verify  =   jwt.verify(token , process.env.JWT_SECRET!)
                if (!verify){
                        res.status(400).json({
                                msg:'user not authenticated please login again'
                        })
                        return
                }
                console.log(verify)
                //@ts-ignore
                req.userId = verify.id
                next()
        }catch(e){
                console.log(e)
                res.status(400).json({
                                msg:'unable to authenticated please login again'
                        })

        }
}