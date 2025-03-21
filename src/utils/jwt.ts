import jwt, {JwtPayload, Secret, SignOptions} from "jsonwebtoken";
import {Request} from "express";

/**
 * Encode payload to jwt token.
 *
 * @param payload - Payload to encode.
 * @returns - Encoded token.
 */
const encode = (payload: Record<string, any>): string => {
    const secret: Secret = String(process.env.JWT_SECRET);
    const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 604800;
    const options: SignOptions = {expiresIn: expiresIn};
    return jwt.sign(payload, secret, options);
}

/**
 * Decode jwt token.
 *
 * @param token - JWT token.
 * @returns - Decoded payload.
 */
const decode = (token: string): JwtPayload | string => {
    const secret: Secret = String(process.env.JWT_SECRET);
    return jwt.verify(token, secret);
}

/**
 * Encode payload to jwt token for refreshing.
 *
 * @param payload - Refresh token.
 * @returns - New token.
 */
const encodeForRefreshing = (payload: Record<string, any>): string => {
    const secret: Secret = String(process.env.JWT_SECRET);
    const expiresIn = Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800;
    const options: SignOptions = {expiresIn: expiresIn};
    return jwt.sign(payload, secret, options);
}

/**
 * Verify token.
 *
 * @param request - Request.
 * @returns - Token.
 */
const getCurrentToken = (request: Request) => {
    const token = request.headers.authorization?.split(' ')[1];
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
const getCurrentUser = (request: Request) => {
    const token = getCurrentToken(request);
    if (!token) {
        return null;
    }
    return decode(token);
}

export {encode, decode, encodeForRefreshing, getCurrentUser}