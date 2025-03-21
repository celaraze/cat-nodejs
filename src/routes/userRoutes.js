"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// 创建用户
router.post('/', userController_1.createUserController);
// 查询所有用户
router.get('/', userController_1.getUsersController);
// 查询单个用户
router.get('/:id', userController_1.getUserByIdController);
// 更新用户信息
router.put('/:id', userController_1.updateUserController);
// 软删除用户
router.delete('/:id', userController_1.softDeleteUserController);
// 获取用户角色列表及合并后的 scopes 列表
router.get('/:userId/roles', userController_1.getUserRolesController);
exports.default = router;
