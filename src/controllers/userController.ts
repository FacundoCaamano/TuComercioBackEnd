import { Request,Response } from "express"
import { userModel } from "../models/userModel"
import { hashPassword } from "../utils/security"


export const userRegister = async (req:Request,res:Response):Promise<void> =>{
    const username = req.body['username']
    const email = req.body['email']
    const password = req.body['password']
    try{
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            res.status(409).json({
                message: "Este email ya se encuentra registrado"
            });
            return
        }
        if(!username || !password || !password){
            res.status(400).json({
                message: 'Todos los campos son requeridos'
            })
        }
        else{
                 const hash= await hashPassword(password)
                 const newUser = new userModel({
                         name:username,
                         email:email,
                         password:hash
                     }
                 )
                await newUser.save()
                res.status(201).json({message:"usuario registrado"})
        }
    }catch{
        res.status(500).json({message: 'error'})
    }
    
}