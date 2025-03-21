import jwt from "jsonwebtoken";
import {jwtConfig} from "../config/env.js";

/**
 * Encode payload to jwt token.
 *
 * @param {Record} payload
 * @returns {string} - Encoded token.
 */
const encode = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}

/**
 * Decode jwt token.
 *
 * @param {string} token - JWT token.
 * @returns {Record} - Decoded payload.
 */
const decode = (token) => {
    return jwt.verify(token, jwtConfig.secret);
}

/**
 * Encode payload to jwt token for refreshing.
 *
 * @param {Record} payload - Refresh token.
 * @returns {string} - New token.
 */
const encodeForRefreshing = (payload) => {
    return jwt.sign({userId: payload.userId}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}
export {encode, decode, encodeForRefreshing}