import express from 'express'
import { connectMongo } from './server'


const app = express()
const PORT = process.env.PORT
app.use(express.json())



const startServer = async() =>{
    try{
        await connectMongo()
        app.listen(PORT,()=>{
            console.log('servidor corriendo en el puerto: ',PORT);
            
        })
    }catch(error){
        console.log('Error al conectar con el servidor',error);
        
    }
}

startServer()