import express from 'express'
import { connectMongo } from './config/db'
import { config } from './config/dotenv'
import userRouters from './routes/userRouter'

const app = express()
const PORT = config.PORT
app.use(express.json())


app.use('/tuComercio/',userRouters)

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