import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI 


export const connectMongo = async ()=>{
    if(MONGO_URI){
        await mongoose.connect(
            MONGO_URI,
            {
                dbName:'TuComercio'
            }
        )
        mongoose.connection.on('connected', async()=>{
            console.log('Conectado a TuComercio');
        })
        mongoose.connection.off('disconnect',()=> {
            console.log('servidor desconectado');
            
        })
    }
}