import express from 'express';
import bodyParser from 'body-parser';
import {Sequelize} from 'sequelize';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import yaml from 'js-yaml';
import fs from 'fs';

// 读取配置文件
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const dbConfig = config.database;
console.log(dbConfig);

// 初始化 Sequelize 连接到 MySQL 数据库
const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

// 测试数据库连接
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

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

export {sequelize};
    