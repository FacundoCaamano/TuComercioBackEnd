import { Request,Response } from "express"
import { userModel } from "../models/userModel"
import { hashPassword } from "../utils/security"


export const userRegister = async (req:Request,res:Response) =>{
    const username = req.body['username']
    const email = req.body['email']
    const password = req.body['password']
    try{
        if(!username){

        }
        if(!password){

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
                res.status(500).json({message:"usuario registrado"})
        }
    }catch{
        res.status(400).json({message: 'error'})
    }
    
}