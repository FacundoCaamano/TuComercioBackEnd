import dotenv from 'dotenv'
import path from 'path'


const ENV_PATH = path.resolve(__dirname, '../../.env')
dotenv.config({path: ENV_PATH})


export const config = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.LOCAL_URL
} 

