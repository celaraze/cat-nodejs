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
exports.softDeleteRoleController = exports.updateRoleController = exports.getRoleByIdController = exports.getRolesController = exports.createRoleController = void 0;
const roleModel_1 = require("../models/roleModel");
const response_1 = __importDefault(require("../utils/response"));
const auth_1 = require("../utils/auth");
const createRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, auth_1.verifyToken)(req);
    if (!userId) {
        return (0, response_1.default)(res, 401, 'Unauthorized');
    }
    const hasPermission = yield (0, auth_1.checkPermissions)(userId, ['role:insert']);
    if (!hasPermission) {
        return (0, response_1.default)(res, 403, 'Forbidden');
    }
    const role = req.body;
    try {
        const newRole = yield (0, roleModel_1.createRole)(role);
        (0, response_1.default)(res, 201, 'Role created successfully', newRole);
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to insert role');
    }
});
exports.createRoleController = createRoleController;
const getRolesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, auth_1.verifyToken)(req);
    if (!userId) {
        return (0, response_1.default)(res, 401, 'Unauthorized');
    }
    const hasPermission = yield (0, auth_1.checkPermissions)(userId, ['role:list']);
    if (!hasPermission) {
        return (0, response_1.default)(res, 403, 'Forbidden');
    }
    try {
        const allRoles = yield (0, roleModel_1.getRoles)();
        (0, response_1.default)(res, 200, 'Roles retrieved successfully', allRoles);
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to get roles');
    }
});
exports.getRolesController = getRolesController;
const getRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, auth_1.verifyToken)(req);
    if (!userId) {
        return (0, response_1.default)(res, 401, 'Unauthorized');
    }
    const hasPermission = yield (0, auth_1.checkPermissions)(userId, ['role:read']);
    if (!hasPermission) {
        return (0, response_1.default)(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    try {
        const role = yield (0, roleModel_1.findRoleById)(id);
        if (role) {
            (0, response_1.default)(res, 200, 'Role retrieved successfully', role);
        }
        else {
            (0, response_1.default)(res, 404, 'Role not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to get role');
    }
});
exports.getRoleByIdController = getRoleByIdController;
const updateRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, auth_1.verifyToken)(req);
    if (!userId) {
        return (0, response_1.default)(res, 401, 'Unauthorized');
    }
    const hasPermission = yield (0, auth_1.checkPermissions)(userId, ['role:update']);
    if (!hasPermission) {
        return (0, response_1.default)(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    const roleData = req.body;
    try {
        const updatedRole = yield (0, roleModel_1.updateRole)(id, roleData);
        if (updatedRole) {
            (0, response_1.default)(res, 200, 'Role updated successfully', updatedRole);
        }
        else {
            (0, response_1.default)(res, 404, 'Role not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to update role');
    }
});
exports.updateRoleController = updateRoleController;
const softDeleteRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, auth_1.verifyToken)(req);
    if (!userId) {
        return (0, response_1.default)(res, 401, 'Unauthorized');
    }
    const hasPermission = yield (0, auth_1.checkPermissions)(userId, ['role:delete']);
    if (!hasPermission) {
        return (0, response_1.default)(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    try {
        const isDeleted = yield (0, roleModel_1.softDeleteRole)(id);
        if (isDeleted) {
            (0, response_1.default)(res, 200, 'Role soft deleted successfully');
        }
        else {
            (0, response_1.default)(res, 404, 'Role not found');
        }
    }
    catch (error) {
        (0, response_1.default)(res, 500, 'Failed to soft delete role');
    }
});
exports.softDeleteRoleController = softDeleteRoleController;
