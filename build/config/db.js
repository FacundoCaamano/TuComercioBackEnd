"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_2 = require("./dotenv");
dotenv_1.default.config(); // Carga las variables de entorno
const MONGO_URI = dotenv_2.config.MONGO_URI;
const DB_NAME = 'TuComercio';
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!MONGO_URI) {
        throw new Error('URI de MongoDB no configurada en las variables de entorno');
    }
    try {
        yield mongoose_1.default.connect(MONGO_URI, {
            dbName: DB_NAME
        });
        mongoose_1.default.connection.on('connected', () => {
            console.log(`✅ Conectado a MongoDB: Base de datos "${DB_NAME}"`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('❌ Desconectado de MongoDB');
        });
        mongoose_1.default.connection.on('error', (error) => {
            console.error(`⚠️ Error en la conexión a MongoDB: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`❌ Error al conectar a MongoDB: ${error}`);
        process.exit(1); // Finaliza el proceso si la conexión falla
    }
});
exports.connectMongo = connectMongo;
