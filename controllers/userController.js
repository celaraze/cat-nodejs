import sendResponse from '../utils/response.js';
import {verify} from '../utils/auth.js';
import {insert, selectById, selectAll, softDelete, update} from "../services/userService.js";

const createUserController = async (req, res) => {
    await verify(req, res, ['user:insert']);
    const user = req.body;
    try {
        const newUser = await insert(user);
        sendResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        sendResponse(res, 500, 'Failed to insert user');
    }
};

const getUsersController = async (req, res) => {
    await verify(req, res, ['user:list']);
    try {
        const allUsers = await selectAll();
        sendResponse(res, 200, 'Users retrieved successfully', allUsers);
    } catch (error) {
        sendResponse(res, 500, 'Failed to get users');
    }
};

const getUserByIdController = async (req, res) => {
    await verify(req, res, ['user:info']);
    const {id} = req.params;
    try {
        const user = await selectById(id);
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
    await verify(req, res, ['user:update']);
    const {id} = req.params;
    const userData = req.body;
    try {
        const updatedUser = await update(id, userData);
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
    await verify(req, res, ['user:soft-delete']);
    const {id} = req.params;
    try {
        const isDeleted = await softDelete(id);
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
    await verify(req, res, ['user:list-roles']);
    const {userId: targetUserId} = req.params;
    try {
        const user = await selectById(targetUserId);
        if (!user) {
            return sendResponse(res, 404, 'User not found');
        }
        const roles = await user.getRoles({where: {deletedAt: null}});
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
    