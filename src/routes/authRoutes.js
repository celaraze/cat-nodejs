"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// 登录接口
router.post('/login', authController_1.login);
// 获取当前用户信息接口
router.get('/current', authController_1.getCurrentUser);
// 刷新 token 接口
router.post('/refresh', authController_1.refreshToken);
exports.default = router;
