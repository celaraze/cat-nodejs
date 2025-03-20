import express from 'express';
import { login, getCurrentUser, refreshToken } from '../controllers/authController.js';

const router = express.Router();

// 登录接口
router.post('/login', login);
// 获取当前用户信息接口
router.get('/current', getCurrentUser);
// 刷新 token 接口
router.post('/refresh', refreshToken);

export default router;
    