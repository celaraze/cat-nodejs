"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const router = express_1.default.Router();
// 创建角色
router.post('/', roleController_1.createRoleController);
// 查询所有角色
router.get('/', roleController_1.getRolesController);
// 查询单个角色
router.get('/:id', roleController_1.getRoleByIdController);
// 更新角色信息
router.put('/:id', roleController_1.updateRoleController);
// 软删除角色
router.delete('/:id', roleController_1.softDeleteRoleController);
exports.default = router;
