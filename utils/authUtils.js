import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';
import yaml from 'js-yaml';
import fs from 'fs';

// 读取配置文件
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const jwtConfig = config.jwt;

const verifyToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

const checkPermissions = async (userId, requiredScopes) => {
    const user = await findUserById(userId);
    if (!user) {
        return false;
    }
    const roles = await user.getRoles({ where: { deletedAt: null } });
    const userScopes = roles.flatMap(role => role.scopes);
    return requiredScopes.every(scope => userScopes.includes(scope));
};

export {
    verifyToken,
    checkPermissions
};
    