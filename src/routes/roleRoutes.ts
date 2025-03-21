import express from 'express';
import {
    createRoleController,
    getRoleByIdController,
    getRolesController,
    softDeleteRoleController,
    updateRoleController
} from '../controllers/roleController';

const router = express.Router();

// 创建角色
router.post('/', createRoleController);

// 查询所有角色
router.get('/', getRolesController);

// 查询单个角色
router.get('/:id', getRoleByIdController);

// 更新角色信息
router.put('/:id', updateRoleController);

// 软删除角色
router.delete('/:id', softDeleteRoleController);

export default router;
    