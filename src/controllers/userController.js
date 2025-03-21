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
exports.getUserRolesController = exports.softDeleteUserController = exports.updateUserController = exports.getUserByIdController = exports.getUsersController = exports.createUserController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const auth_1 = require("../utils/auth");
const userService_1 = require("../services/userService");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:insert']);
    const user = req.body;
    try {
        const newUser = yield (0, userService_1.insert)(user);
        (0, response_1.default)(res, 201, 'User created successfully', newUser);
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to insert user');
    }
});
exports.createUserController = createUserController;
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:list']);
    try {
        const allUsers = yield (0, userService_1.selectAll)();
        (0, response_1.default)(res, 200, 'Users retrieved successfully', allUsers);
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to get users');
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:info']);
    const { id } = req.params;
    try {
        const user = yield (0, userService_1.selectById)(id);
        if (user) {
            (0, response_1.default)(res, 200, 'User retrieved successfully', user);
        }
        else {
            (0, response_1.default)(res, 404, 'User not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to get user');
    }
});
exports.getUserByIdController = getUserByIdController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:update']);
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = yield (0, userService_1.update)(id, userData);
        if (updatedUser) {
            (0, response_1.default)(res, 200, 'User updated successfully', updatedUser);
        }
        else {
            (0, response_1.default)(res, 404, 'User not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to update user');
    }
});
exports.updateUserController = updateUserController;
const softDeleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:soft-delete']);
    const { id } = req.params;
    try {
        const isDeleted = yield (0, userService_1.softDelete)(id);
        if (isDeleted) {
            (0, response_1.default)(res, 200, 'User soft deleted successfully');
        }
        else {
            (0, response_1.default)(res, 404, 'User not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to soft delete user');
    }
});
exports.softDeleteUserController = softDeleteUserController;
const getUserRolesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.verify)(req, res, ['user:list-roles']);
    const { userId: targetUserId } = req.params;
    try {
        const user = yield (0, userService_1.selectById)(targetUserId);
        if (!user) {
            return (0, response_1.default)(res, 404, 'User not found');
        }
        const roles = yield user.getRoles({ where: { deletedAt: null } });
        const scopes = roles.flatMap(role => role.scopes);
        const uniqueScopes = [...new Set(scopes)];
        (0, response_1.default)(res, 200, 'User roles and scopes retrieved successfully', {
            roles,
            scopes: uniqueScopes
        });
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to get user roles and scopes');
    }
});
exports.getUserRolesController = getUserRolesController;
