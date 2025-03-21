import sendResponse from "./response";
import {selectById} from "../services/userService";
import {getCurrentUser} from "./jwt";
import {Request, Response} from "express";

const checkPermissions = async (userId: number, requiredScopes: Array<string>) => {
    const user = await selectById(userId);
    if (!user) {
        return false;
    }
    const roles = await user.getRoles({where: {deletedAt: null}});
    const userScopes = roles.flatMap((role: { scopes: string[] }) => role.scopes);
    return requiredScopes.every(scope => userScopes.includes(scope));
};


const verify = async (request: Request, response: Response, scopes: Array<string>): Promise<any> => {
    const payload = getCurrentUser(request) as { userId: number };
    if (!payload) {
        return sendResponse(response, 401, 'Unauthorized');
    }
    const hasPermission = await checkPermissions(payload.userId, scopes);
    if (!hasPermission) {
        return sendResponse(response, 403, 'Forbidden');
    }
}

export {
    checkPermissions,
    verify,
};
    