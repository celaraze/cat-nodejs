import sendResponse from '../utils/response.js';
import {decode, encode, encodeForRefreshing} from "../utils/jwt.js";
import {compare} from "../utils/bcrypt.js";
import {selectByEmail} from "../services/userService.js";


const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await selectByEmail(email);
        if (!user || !compare(password, user.password)) {
            return sendResponse(res, 401, 'Invalid credentials');
        }
        const token = encode({userId: user.id});
        const refreshToken = encodeForRefreshing({userId: user.id});
        sendResponse(res, 200, 'Login successful', {token, refreshToken});
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
        const decoded = decode(token);
        const user = await selectByEmail(decoded.email);
        if (!user) {
            return sendResponse(res, 404, 'User not found');
        }
        sendResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        sendResponse(res, 401, 'Invalid token');
    }
};

const refreshToken = async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) {
        return sendResponse(res, 401, 'No refresh token provided');
    }
    try {
        const decoded = decode(refreshToken);
        const newToken = encode({userId: decoded.userId});
        sendResponse(res, 200, 'Token refreshed successfully', {token: newToken});
    } catch (error) {
        sendResponse(res, 401, 'Invalid refresh token');
    }
};

export {
    login,
    getCurrentUser,
    refreshToken
};
    