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
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = require("./config/dotenv");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: dotenv_1.config.BASE_URL,
    credentials: true
}));
const PORT = dotenv_1.config.PORT;
app.use(express_1.default.json());
app.use('/tuComercio/', userRouter_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(dotenv_1.config.BASE_URL);
        yield (0, db_1.connectMongo)();
        app.listen(PORT, () => {
            console.log('servidor corriendo en el puerto: ', PORT);
        });
    }
    catch (error) {
        console.log('Error al conectar con el servidor', error);
    }
});
startServer();
