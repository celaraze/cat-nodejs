"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.getCurrentUser = exports.login = void 0;
const response_1 = __importDefault(require("../utils/response"));
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = require("../utils/bcrypt");
const userService_1 = require("../services/userService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, userService_1.selectByEmail)(email);
        if (!user || !(0, bcrypt_1.compare)(password, user.password)) {
            return (0, response_1.default)(res, 401, 'Invalid credentials');
        }
        const token = (0, jwt_1.encode)({ userId: user.id });
        const refreshToken = (0, jwt_1.encodeForRefreshing)({ userId: user.id });
        (0, response_1.default)(res, 200, 'Login successful', { token, refreshToken });
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Login failed');
    }
});
exports.login = login;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, response_1.default)(res, 401, 'No token provided');
    }
    try {
        const decoded = (0, jwt_1.decode)(token);
        const user = yield (0, userService_1.selectByEmail)(decoded.email);
        if (!user) {
            return (0, response_1.default)(res, 404, 'User not found');
        }
        (0, response_1.default)(res, 200, 'User retrieved successfully', user);
    }
    catch (error) {
        (0, response_1.default)(res, 401, 'Invalid token');
    }
});
exports.getCurrentUser = getCurrentUser;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return (0, response_1.default)(res, 401, 'No refresh token provided');
    }
    try {
        const decoded = (0, jwt_1.decode)(refreshToken);
        const newToken = (0, jwt_1.encode)({ userId: decoded.userId });
        (0, response_1.default)(res, 200, 'Token refreshed successfully', { token: newToken });
    }
    catch (error) {
        (0, response_1.default)(res, 401, 'Invalid refresh token');
    }
});
exports.refreshToken = refreshToken;
