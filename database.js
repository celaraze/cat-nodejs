import {Sequelize} from 'sequelize';
import yaml from 'js-yaml';
import fs from 'fs';

// 读取配置文件
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const dbConfig = config.database;

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

export {sequelize};