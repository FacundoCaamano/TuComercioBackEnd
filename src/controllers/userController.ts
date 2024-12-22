import { Request,Response } from "express"
import { userModel } from "../models/userModel"
import { hashPassword, verrifyPassword } from "../utils/security"
import { createToken } from "../config/jwtConfig"



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

export const userLogin = async(req:Request,res:Response)=>{
    const {email,password}=req.body

    try{    
        const user= await userModel.findOne({email})
        if(!user){
            res.status(404).json({message:'usuario no encontrado'})
        }
        if(user){
            const isPasswordValid = await verrifyPassword(password,user.password)
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            
            
            const token = createToken({id: user._id, email: user.email})
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });   
        }   
    }catch(err){
        res.status(500).json({ message: 'Error en el servidor', err });
    }
}