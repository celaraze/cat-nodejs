"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const database_1 = require("./dependencies/database");
database_1.appDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch(error => {
    console.error(error);
});
// 解析 JSON 请求体
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// 使用用户路由
app.use('/api/users', userRoutes_1.default);
// 使用认证路由
app.use('/api/auth', authRoutes_1.default);
// 使用角色路由
app.use('/api/roles', roleRoutes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
