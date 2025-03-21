import jwt from 'jsonwebtoken';
import {jwtConfig} from "../config/env.js";
import sendResponse from "./response.js";
import {selectById} from "../services/userService.js";

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
    const user = await selectById(userId);
    if (!user) {
        return false;
    }
    const roles = await user.getRoles({where: {deletedAt: null}});
    const userScopes = roles.flatMap(role => role.scopes);
    return requiredScopes.every(scope => userScopes.includes(scope));
};

/**
 * Verify user token and check if user has required scopes。
 * @param req - Request.
 * @param res - Response.
 * @param {Array<string>} scopes - Required scopes.
 * @returns {Promise<*>} - Response.
 */
const verify = async (req, res, scopes) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, scopes);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
}

export {
    verifyToken,
    checkPermissions,
    verify,
};
    