import { createUser, getUsers, findUserById, updateUser, softDeleteUser } from '../models/userModel.js';
import { getRoles } from '../models/roleModel.js';
import sendResponse from '../utils/response.js';
import { verifyToken, checkPermissions } from '../utils/authUtils.js';

const createUserController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:create']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const user = req.body;
    try {
        const newUser = await createUser(user);
        sendResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        sendResponse(res, 500, 'Failed to create user');
    }
};

const getUsersController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:list']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    try {
        const allUsers = await getUsers();
        sendResponse(res, 200, 'Users retrieved successfully', allUsers);
    } catch (error) {
        sendResponse(res, 500, 'Failed to get users');
    }
};

const getUserByIdController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:read']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        if (user) {
            sendResponse(res, 200, 'User retrieved successfully', user);
        } else {
            sendResponse(res, 404, 'User not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to get user');
    }
};

const updateUserController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:update']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updateUser(id, userData);
        if (updatedUser) {
            sendResponse(res, 200, 'User updated successfully', updatedUser);
        } else {
            sendResponse(res, 404, 'User not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to update user');
    }
};

const softDeleteUserController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:delete']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const { id } = req.params;
    try {
        const isDeleted = await softDeleteUser(id);
        if (isDeleted) {
            sendResponse(res, 200, 'User soft deleted successfully');
        } else {
            sendResponse(res, 404, 'User not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to soft delete user');
    }
};

const getUserRolesController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['user:roles']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const { userId: targetUserId } = req.params;
    try {
        const user = await findUserById(targetUserId);
        if (!user) {
            return sendResponse(res, 404, 'User not found');
        }
        const roles = await user.getRoles({ where: { deletedAt: null } });
        const scopes = roles.flatMap(role => role.scopes);
        const uniqueScopes = [...new Set(scopes)];
        sendResponse(res, 200, 'User roles and scopes retrieved successfully', {
            roles,
            scopes: uniqueScopes
        });
    } catch (error) {
        sendResponse(res, 500, 'Failed to get user roles and scopes');
    }
};

export {
    createUserController,
    getUsersController,
    getUserByIdController,
    updateUserController,
    softDeleteUserController,
    getUserRolesController
};
    