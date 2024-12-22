"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || ''; // Almacena esta clave en tu .env
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY);
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (_a) {
        return null;
    }
};
exports.verifyToken = verifyToken;
