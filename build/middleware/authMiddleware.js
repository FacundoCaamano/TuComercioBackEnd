"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwtConfig_1 = require("../config/jwtConfig");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.params['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: "Acceso no autorizado" });
    }
    const token = authHeader.split(' ')[1];
    const decode = (0, jwtConfig_1.verifyToken)(token);
    if (!decode) {
        return res.status(401).json({ message: 'Session expirada o invalida' });
    }
    req.user = decode;
    next();
};
exports.authenticateJWT = authenticateJWT;
