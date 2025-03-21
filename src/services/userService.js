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
exports.softDelete = exports.selectByEmail = exports.selectById = exports.selectAll = exports.insert = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../dependencies/database");
const typeorm_1 = require("typeorm");
const insert = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        return yield userRepository.save(user);
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});
exports.insert = insert;
const selectAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        return yield userRepository.findBy({ deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
});
exports.selectAll = selectAll;
const selectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        return yield userRepository.findOneBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
});
exports.selectById = selectById;
const selectByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        return yield userRepository.findOneBy({ username: username, deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
});
const selectByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        return yield userRepository.findOneBy({ email: email, deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
});
exports.selectByEmail = selectByEmail;
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        const users = yield userRepository.findBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
        return yield userRepository.softRemove(users);
    }
    catch (error) {
        console.error('Error soft deleting users:', error);
        throw error;
    }
});
exports.softDelete = softDelete;
const restore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.appDataSource.getRepository(User_1.User);
        const users = yield userRepository.findBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
        return yield userRepository.recover(users);
    }
    catch (error) {
        console.error('Error restoring users:', error);
        throw error;
    }
});
