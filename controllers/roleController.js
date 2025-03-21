import {createRole, findRoleById, getRoles, softDeleteRole, updateRole} from '../models/roleModel.js';
import sendResponse from '../utils/response.js';
import {checkPermissions, verifyToken} from '../utils/auth.js';

const createRoleController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['role:insert']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const role = req.body;
    try {
        const newRole = await createRole(role);
        sendResponse(res, 201, 'Role created successfully', newRole);
    } catch (error) {
        sendResponse(res, 500, 'Failed to insert role');
    }
};

const getRolesController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['role:list']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    try {
        const allRoles = await getRoles();
        sendResponse(res, 200, 'Roles retrieved successfully', allRoles);
    } catch (error) {
        sendResponse(res, 500, 'Failed to get roles');
    }
};

const getRoleByIdController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['role:read']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const {id} = req.params;
    try {
        const role = await findRoleById(id);
        if (role) {
            sendResponse(res, 200, 'Role retrieved successfully', role);
        } else {
            sendResponse(res, 404, 'Role not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to get role');
    }
};

const updateRoleController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['role:update']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const {id} = req.params;
    const roleData = req.body;
    try {
        const updatedRole = await updateRole(id, roleData);
        if (updatedRole) {
            sendResponse(res, 200, 'Role updated successfully', updatedRole);
        } else {
            sendResponse(res, 404, 'Role not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to update role');
    }
};

const softDeleteRoleController = async (req, res) => {
    const userId = verifyToken(req);
    if (!userId) {
        return sendResponse(res, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(userId, ['role:delete']);
    if (!hasPermission) {
        return sendResponse(res, 403, 'Forbidden');
    }
    const {id} = req.params;
    try {
        const isDeleted = await softDeleteRole(id);
        if (isDeleted) {
            sendResponse(res, 200, 'Role soft deleted successfully');
        } else {
            sendResponse(res, 404, 'Role not found');
        }
    } catch (error) {
        sendResponse(res, 500, 'Failed to soft delete role');
    }
};

export {
    createRoleController,
    getRolesController,
    getRoleByIdController,
    updateRoleController,
    softDeleteRoleController
};
    