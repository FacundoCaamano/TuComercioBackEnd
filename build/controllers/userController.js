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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const userModel_1 = require("../models/userModel");
const security_1 = require("../utils/security");
const jwtConfig_1 = require("../config/jwtConfig");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body['username'];
    const email = req.body['email'];
    const password = req.body['password'];
    try {
        const existingUser = yield userModel_1.userModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({
                message: "Este email ya se encuentra registrado"
            });
            return;
        }
        if (!username || !password || !password) {
            res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }
        else {
            const hash = yield (0, security_1.hashPassword)(password);
            const newUser = new userModel_1.userModel({
                name: username,
                email: email,
                password: hash
            });
            yield newUser.save();
            res.status(201).json({ message: "usuario registrado" });
        }
    }
    catch (_a) {
        res.status(500).json({ message: 'error' });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'usuario no encontrado' });
        }
        if (user) {
            const isPasswordValid = yield (0, security_1.verrifyPassword)(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            const token = (0, jwtConfig_1.createToken)({ id: user._id, email: user.email });
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error en el servidor', err });
    }
});
exports.userLogin = userLogin;
