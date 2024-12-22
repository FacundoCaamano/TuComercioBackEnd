import jwt from 'jsonwebtoken'


const SECRET_KEY = process.env.JWT_SECRET || ''; // Almacena esta clave en tu .env



export const createToken = (payload:object) =>{
    return jwt.sign(payload,SECRET_KEY)
}

export const verifyToken = (token:string)=>{
    try{
        return jwt.verify(token,SECRET_KEY)
    }catch{
        return null
    }
}