import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import './models/associations.js';

// 解析 JSON 请求体
const app = express();
app.use(bodyParser.json());

// 使用用户路由
app.use('/api/users', userRoutes);
// 使用认证路由
app.use('/api/auth', authRoutes);
// 使用角色路由
app.use('/api/roles', roleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});