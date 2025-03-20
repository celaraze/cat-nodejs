import express from 'express';
import { createUserController, getUsersController, getUserByIdController, updateUserController, softDeleteUserController, getUserRolesController } from '../controllers/userController.js';

const router = express.Router();

// 创建用户
router.post('/', createUserController);

// 查询所有用户
router.get('/', getUsersController);

// 查询单个用户
router.get('/:id', getUserByIdController);

// 更新用户信息
router.put('/:id', updateUserController);

// 软删除用户
router.delete('/:id', softDeleteUserController);

// 获取用户角色列表及合并后的 scopes 列表
router.get('/:userId/roles', getUserRolesController);

export default router;
    