import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/userModel.js';
import yaml from 'js-yaml';
import fs from 'fs';
import sendResponse from '../utils/response.js';

// 读取配置文件
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const jwtConfig = config.jwt;

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || user.password!== password) {
            return sendResponse(res, 401, 'Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        const refreshToken = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn });
        sendResponse(res, 200, 'Login successful', { token, refreshToken });
    } catch (error) {
        sendResponse(res, 500, 'Login failed');
    }
};

const getCurrentUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return sendResponse(res, 401, 'No token provided');
    }
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        const user = await findUserByEmail(decoded.email);
        if (!user) {
            return sendResponse(res, 404, 'User not found');
        }
        sendResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        sendResponse(res, 401, 'Invalid token');
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return sendResponse(res, 401, 'No refresh token provided');
    }
    try {
        const decoded = jwt.verify(refreshToken, jwtConfig.secret);
        const newToken = jwt.sign({ userId: decoded.userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        sendResponse(res, 200, 'Token refreshed successfully', { token: newToken });
    } catch (error) {
        sendResponse(res, 401, 'Invalid refresh token');
    }
};

export {
    login,
    getCurrentUser,
    refreshToken
};
    