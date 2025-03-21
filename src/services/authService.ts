import {User} from "../entities/User";
import {Role} from "../entities/Role";
import {encrypt} from "../utils/bcrypt";
import {insert as insertUser, selectById, selectByUsername} from "./userService";
import {insert as insertRole} from "./roleService";
import {compare} from "bcryptjs";
import {encode, encodeForRefreshing, getCurrentUser} from "../utils/jwt";
import {Request, Response} from "express";
import sendResponse from "../utils/response";


const createSuperuser = async () => {
    const role = new Role()
    role.name = "superuser";
    const role_inserted = await insertRole(role);

    const user = new User()
    user.name = "admin";
    user.username = "admin";
    user.password = encrypt("admin");
    user.email = "admin@localhost";
    user.roles = [role_inserted];
    return await insertUser(user);
}

const login = async (username: string, password: string) => {
    const user = await selectByUsername(username);
    if (!user || !await compare(password, user.password)) {
        throw new Error('Invalid username or password.');
    }
    const token = encode({userId: user.id});
    const refreshToken = encodeForRefreshing({userId: user.id});
    return {token, refreshToken};
}

const checkScopes = async (userId: number, requiredScopes: Array<string>) => {
    const user = await selectById(userId);
    if (!user) {
        throw new Error('Invalid user.');
    }
    // todo 这个roles没有考虑where deletedAt is null
    const roles = user.roles;
    const userScopes = roles.flatMap((role: { scopes: string[] }) => role.scopes);
    return requiredScopes.every(scope => userScopes.includes(scope));
};

const checkPermissions = async (request: Request, response: Response, scopes: Array<string>): Promise<any> => {
    const payload = getCurrentUser(request) as { userId: number };
    if (!payload) {
        return sendResponse(response, 401, 'Unauthorized');
    }
    const hasPermission = await checkScopes(payload.userId, scopes);
    if (!hasPermission) {
        return sendResponse(response, 403, 'Forbidden');
    }
}

export {
    createSuperuser,
    login,
    checkPermissions
}