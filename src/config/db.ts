import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { config } from './dotenv';

dotenv.config(); // Carga las variables de entorno

const MONGO_URI = config.MONGO_URI;
const DB_NAME = 'TuComercio'

export const connectMongo = async() =>{
    if(!MONGO_URI){
        throw new Error('URI de MongoDB no configurada en las variables de entorno')
    }
    try{
        await mongoose.connect(MONGO_URI,{
            dbName: DB_NAME
        })
        mongoose.connection.on('connected',()=>{
            console.log(`✅ Conectado a MongoDB: Base de datos "${DB_NAME}"`);
            
        })
        mongoose.connection.on('disconnected', () => {
            console.log('❌ Desconectado de MongoDB');
          });
          
          mongoose.connection.on('error', (error) => {
            console.error(`⚠️ Error en la conexión a MongoDB: ${error.message}`);
          });
    }
    catch(error){
        console.error(`❌ Error al conectar a MongoDB: ${error}`);
        process.exit(1); // Finaliza el proceso si la conexión falla
    }
}