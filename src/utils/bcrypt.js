"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Encrypts a password.
 *
 * @param password - The password to encrypt.
 * @returns {string} - The encrypted password.
 */
const encrypt = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.encrypt = encrypt;
/**
 * Compares a password with a hashed password.
 *
 * @param password - The password to compare.
 * @param hashedPassword - The hashed password to compare.
 * @returns {boolean} - True if the password matches the hashed password, false otherwise.
 */
const compare = (password, hashedPassword) => {
    return bcryptjs_1.default.compareSync(password, hashedPassword);
};
exports.compare = compare;
