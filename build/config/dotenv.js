"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ENV_PATH = path_1.default.resolve(__dirname, '../../.env');
dotenv_1.default.config({ path: ENV_PATH });
exports.config = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.LOCAL_URL
};
