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
exports.userRegister = void 0;
const userModel_1 = require("../models/userModel");
const security_1 = require("../utils/security");
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
