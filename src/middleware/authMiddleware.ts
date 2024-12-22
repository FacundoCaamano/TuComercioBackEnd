import { Request,Response,NextFunction } from "express"
import { verifyToken } from "../config/jwtConfig"
export const authenticateJWT= (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.params['authorization']

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({message:"Acceso no autorizado"})
    }

    const token = authHeader.split(' ')[1]
    const decode = verifyToken(token)

    if(!decode){
        return res.status(401).json({message:'Session expirada o invalida'})
    }

    (req as any).user = decode
    next()
}