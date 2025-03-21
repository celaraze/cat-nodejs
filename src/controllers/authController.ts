import sendResponse from '../utils/response';
import {decode, encode} from "../utils/jwt";
import {Request, Response} from "express";
import {checkPermissions, login as authServiceLogin} from "../services/authService";
import {selectById} from "../services/roleService";
import {JsonWebTokenPayload} from "../schemas/JsonWebTokenPayload";


const login = async (request: Request, response: Response) => {
    const {username, password} = request.body;
    try {
        const {token, refreshToken} = await authServiceLogin(username, password);
        return sendResponse(response, 200, 'Login successful.', {token, refreshToken});
    } catch (error) {
        return sendResponse(response, 500, 'Login failed.');
    }
};

const getCurrentUser = async (request: Request, response: Response) => {
    await checkPermissions(request, response, ['auth:me']);
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
        return sendResponse(response, 401, 'No token provided.');
    }
    try {
        const decoded = decode(token) as JsonWebTokenPayload;
        const user = await selectById(decoded.userId);
        if (!user) {
            return sendResponse(response, 404, 'User not found.');
        }
        sendResponse(response, 200, 'User retrieved successfully.', user);
    } catch (error) {
        sendResponse(response, 401, 'Invalid token.');
    }
};

const refreshToken = async (request: Request, response: Response) => {
    const {refreshToken} = request.body;
    if (!refreshToken) {
        return sendResponse(response, 401, 'No refresh token provided.');
    }
    try {
        const decoded = decode(refreshToken) as JsonWebTokenPayload;
        const newToken = encode({userId: decoded.userId});
        sendResponse(response, 200, 'Token refreshed successfully.', {token: newToken});
    } catch (error) {
        sendResponse(response, 401, 'Invalid refresh token.');
    }
};

export {
    login,
    getCurrentUser,
    refreshToken
};
    