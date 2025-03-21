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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const Role_1 = require("../entities/Role");
const bcrypt_1 = require("../utils/bcrypt");
const userService_1 = require("./userService");
const roleService_1 = require("./roleService");
const createSuperuser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = new Role_1.Role();
        role.name = "superuser";
        const role_inserted = yield (0, roleService_1.insert)(role);
        const user = new User_1.User();
        user.name = "admin";
        user.username = "admin";
        user.password = (0, bcrypt_1.encrypt)("admin");
        user.email = "admin@localhost";
        user.roles = [role_inserted];
        const user_inserted = yield (0, userService_1.insert)(user);
        if (user_inserted) {
            console.log('Superuser created successfully');
        }
    }
    catch (error) {
        console.error('Error creating superuser:', error);
        throw error;
    }
});
