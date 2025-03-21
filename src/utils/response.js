"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        message,
        data
    });
};
exports.default = sendResponse;
