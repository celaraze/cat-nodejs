"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.encodeForRefreshing = exports.decode = exports.encode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Encode payload to jwt token.
 *
 * @param payload - Payload to encode.
 * @returns - Encoded token.
 */
const encode = (payload) => {
    const secret = String(process.env.JWT_SECRET);
    const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 604800;
    const options = { expiresIn: expiresIn };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.encode = encode;
/**
 * Decode jwt token.
 *
 * @param token - JWT token.
 * @returns - Decoded payload.
 */
const decode = (token) => {
    const secret = String(process.env.JWT_SECRET);
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.decode = decode;
/**
 * Encode payload to jwt token for refreshing.
 *
 * @param payload - Refresh token.
 * @returns - New token.
 */
const encodeForRefreshing = (payload) => {
    const secret = String(process.env.JWT_SECRET);
    const expiresIn = Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800;
    const options = { expiresIn: expiresIn };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.encodeForRefreshing = encodeForRefreshing;
/**
 * Verify token.
 *
 * @param request - Request.
 * @returns - Token.
 */
const getCurrentToken = (request) => {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return null;
    }
    return token;
};
/**
 * Get current user.
 *
 * @param request
 * @returns - Current user.
 */
const getCurrentUser = (request) => {
    const token = getCurrentToken(request);
    if (!token) {
        return null;
    }
    return decode(token);
};
exports.getCurrentUser = getCurrentUser;
