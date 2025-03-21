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
exports.restore = exports.softDelete = exports.selectById = exports.selectAll = exports.insert = void 0;
const Role_1 = require("../entities/Role");
const database_1 = require("../dependencies/database");
const typeorm_1 = require("typeorm");
const insert = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleRepository = database_1.appDataSource.getRepository(Role_1.Role);
        return yield roleRepository.save(role);
    }
    catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
});
exports.insert = insert;
const selectAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleRepository = database_1.appDataSource.getRepository(Role_1.Role);
        return yield roleRepository.findBy({ deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding roles:', error);
        throw error;
    }
});
exports.selectAll = selectAll;
const selectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleRepository = database_1.appDataSource.getRepository(Role_1.Role);
        return yield roleRepository.findOneBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
    }
    catch (error) {
        console.error('Error finding role by id:', error);
        throw error;
    }
});
exports.selectById = selectById;
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleRepository = database_1.appDataSource.getRepository(Role_1.Role);
        const roles = yield roleRepository.findBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
        return yield roleRepository.softRemove(roles);
    }
    catch (error) {
        console.error('Error soft deleting roles:', error);
        throw error;
    }
});
exports.softDelete = softDelete;
const restore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleRepository = database_1.appDataSource.getRepository(Role_1.Role);
        const roles = yield roleRepository.findBy({ id: id, deletedAt: (0, typeorm_1.IsNull)() });
        return yield roleRepository.recover(roles);
    }
    catch (error) {
        console.error('Error restoring roles:', error);
        throw error;
    }
});
exports.restore = restore;
